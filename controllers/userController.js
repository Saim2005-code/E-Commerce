const express = require("express")
const User = require("../models/userSchema.js")
const Products = require("../models/productSchema.js")
const { validateUser } = require("./authController.js")

async function userInfo(req,res) {
    const user = req.user
    if(!user){
        return res.status(404).json({msg:"The token is expired - do relogin"})
        //redirect to login page
    }
    const clientUser = await User.findOne({ _id:user._id })

    if(!clientUser){
        return res.status(201).json({msg:"Sorry there is no account registered with the following credentials - please do sign up to register"})
        //redirect to singUp page
    }
    return res.status(200).json(clientUser)

}

async function handleUserCart(req,res) {
    const user = await User.findById(req.user._id)
    const products = []
    let length = user.cart.length
    for(let i = 0 ; i<length ; i++){
        let prod = await Products.findById(user.cart[i].product_id)
        if(!prod){
            continue
        }
        products.push({
            product:prod,
            counts:user.cart[i].counts
        })
    }
    console.log("Products length:", products.length)
    console.log("User ID:", req.user._id)
    if(products.length === 0) return res.status(200).json([])
    return res.status(200).json(products)
} 

async function addTocart(req,res) {
    const user_id = req.user._id
    const p_id = req.body.product_id

    const user = await User.findById(user_id)
    if(!user) return res.json({msg:"No user found"}) 
    const exsistingItem = user.cart.find( item => 
        item.product_id &&
        item.product_id.toString() === p_id)
    if(exsistingItem){
        exsistingItem.counts++
    }
    else{
        user.cart.push({
            product_id:p_id,
            counts:1
        })
    }
    await user.save()

    return res.status(200).json({msg:"product added to cart"})
}

async function removeItemFromCart(req,res){
    const user_id = req.user._id
    const product_id = req.body.product_id

    const user = await User.findById(user_id)
    if(!user) return res.status(400).json({msg:"No user found"})
    const item = user.cart.find( 
        cartitem => cartitem.product_id && cartitem.product_id.toString() === product_id)
    if(!item){
        return res.status(402).json({ msg:"No item with that id" })
    }
    item.counts--
    if(item.counts <= 0){
        user.cart = user.cart.filter( item => 
            item.product_id &&
            item.product_id.toString() !== product_id)
    }

    await user.save()
    console.log("The item is removed")
    return res.status(200).json({msg:"The item is removed"})

}

async function decrementCount(req,res) {
    const user = req.user;
    const product_id = req.body.product_id
    const customer = await User.findById(user._id)
    if(!customer){
        return res.json({ msg:"No user found" })
    }

    const product = customer.cart.find( item =>
        item.product_id && item.product_id.toString() === product_id
    )
    if(!product) return res.json({ msg:"Product not found in the cart" })
    if(product.counts === 0) return res.json({ msg:"The product count is 0" })
    product.counts -= 1
    await customer.save()

    return res.json({ 
        msg:"Count Decremented Successfully",
        cart:customer.cart
     })

}

async function IncrementCount(req,res) {
    const user = req.user;
    const product_id = req.body.product_id
    const customer = await User.findById(user._id)
    if(!customer){
        return res.json({ msg:"No user found" })
    }

    const product = customer.cart.find( item =>
        item.product_id && item.product_id.toString() === product_id
    )
    if(!product) return res.json({ msg:"Product not found in the cart" })
    product.counts += 1
    await customer.save()

    return res.json({ 
        msg:"Count Incremented Successfully",
        cart:customer.cart
     })

}

module.exports = { userInfo,handleUserCart,addTocart,removeItemFromCart,decrementCount,IncrementCount }