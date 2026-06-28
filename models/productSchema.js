const mongoose = require("mongoose")
const express = require("express")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:"cloths"
    },
    brand:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true   
    },
    price:{
        type:String,
        required:true,
        default:"0"
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        default:0,
        required:true
    },
    image:{
        type:String,
    }
},{timestamps:true})

const productModel = mongoose.model("product",productSchema)

module.exports = productModel
