const express = require("express")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    cart:[{
        product_id:{ type:mongoose.Schema.Types.ObjectId,ref:"Product" },
        counts: { type:Number , default:1}
    }]
})

const model = mongoose.model("user",userSchema)

module.exports = model