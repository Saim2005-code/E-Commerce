const express = require("express")
const Products = require("../models/productSchema.js")

async function handleDemoThings(req,res) {
        const products = await Products.find().limit(20)
        if(products.length === 0){
            return res.status(409).json({msg:"No item available in the home page"})
        }
        return res.status(201).json(products)
}

async function handleSingleProduct(req,res) {
    const id = req.params.id
    const product = await Products.findById(id)
    if(!product) return res.json({msg:"No product with this id"})
    return res.json(product)
}

async function handleCategoricalProduct(req,res) {
    const cate = req.params.category;
     console.log("Category:", cate);
    if(!cate) return res.json(await Products.find().limit(10))
    const product = await Products.find({ category:{$regex:cate,$options:"i"} })
    console.log(product);
    if(product.length === 0){
        return res.json({msg:"No products available in this category"})
    }
    return res.json(product)
}
//name,brand,title,category
async function handleSearchBar(req,res) {
    try{
        const { search } = req.query
        const products = await Products.find({
            $or: [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    brand: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    name:{
                        $regex:search,
                        $options:"i"
                    }
                }
            ]
        });
        res.status(200).json(products)
    }
    catch(err){
        res.status(500).json({
            message:error.message
        });
    }

}

module.exports = {handleDemoThings,handleSingleProduct,handleCategoricalProduct,handleSearchBar }