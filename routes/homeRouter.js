const express = require("express")
const router = express.Router()
const { handleSignUp,handleLogin } = require("../controllers/authController.js")
const authMiddleware = require("../middlewares/authMiddleware.js")
const { handleDemoThings,handleCategoricalProduct } = require("../controllers/staticControllers.js")

router.get("/",authMiddleware,handleDemoThings)
router.post("/signup",handleSignUp)
router.post("/login",handleLogin)
router.get("/:category",authMiddleware,handleCategoricalProduct)

module.exports = router