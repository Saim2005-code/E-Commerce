const express = require("express")
const { validateUser } = require("../controllers/authController.js")

function authMiddleWare(req,res,next) {
    const token = req.cookies?.token
    if(!token) return res.status(403).json({msg:"No token- Go to login page"})
    const user = validateUser(token)
    if(!user) return res.status(401).json({msg:"Token expired, login again"}) //redirect to login page
    req.user = user
    next()
}

module.exports = authMiddleWare