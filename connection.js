const mongoose = require("mongoose")

const connectDB = async (url)=>{
    console.log("MongoDB connected")
    return await mongoose.connect(url)
}

module.exports = connectDB