const express = require("express")
const User = require("../models/userSchema.js")
const jwt = require("jsonwebtoken")
const secret = "$2a$12$uKJP0R3aAJFRsfeBmRP2oeg5MzTwH6DjrDGw1XLM3LcPILB1rWj2m"
const bcrypt = require("bcrypt")

function validateUser(token){
    try{
        return jwt.verify(token, secret);
    }catch(err){
        return null;
    }
}

const handleSignUp = async (req,res)=>{
    try{
        const user = {
            userName:req.body.userName,
            email:req.body.email,
            password: await bcrypt.hash(req.body.password,10)
        }
        const findUser = await User.findOne({ email:user.email })
        if(findUser){
            console.log("You're registered already! kindly login")
            return res.status(409).json({msg:"You're registered already! kindly login"}) //redirect to login page
        }else{
            await User.create(user)
            return res.status(200).json({msg:"Success, Go to homepage"}) //redirect to home page
        }
    }catch(err){
        return  res.status(401).json({msg:err })
    }
}

const handleLogin = async (req,res)=>{
    try{
        const clientUser = req.body
        const user = await User.findOne({ email:clientUser.email })
        if(!user){
            console.log("You're not registered! Do sign up");
            return res.status(500).json({msg:"You're not registered, please sign up"})
        }
        const isMatch = await bcrypt.compare(clientUser.password,user.password)

        if(!isMatch) return res.status(401).json({msg:"Wrong Password"})

        const payload = { email:user.email,_id:user._id }
        const token = jwt.sign(payload,secret)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:'lax'
        })
        return res.status(200).json({msg:"Successfully logged in, go to home page"}) //redirect to homepage
    }catch(err){
        console.log(err)
        return null
    }
}

const handleLogOut = (req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })
    res.status(200).json({msg:"You're succesfully logged out"})
    //redirect to the login page
}

module.exports = { handleSignUp,handleLogin,validateUser,handleLogOut }