const express = require("express")
const router = express.Router()
const { userInfo,handleUserCart,addTocart,removeItemFromCart,decrementCount,IncrementCount } = require("../controllers/userController.js")
const { handleLogOut } = require("../controllers/authController.js")
const authMiddleWare = require("../middlewares/authMiddleware.js")

router.get("/userprofile",authMiddleWare,userInfo)
router.post("/userprofile/logout",handleLogOut)
router.get("/userprofile/cart",authMiddleWare,handleUserCart)
router.patch("/userprofile/cart/addtocart",authMiddleWare,addTocart)
router.patch("userprofile/cart/decrementcount",authMiddleWare,decrementCount)
router.patch("userprofile/cart/incrementcount",authMiddleWare,IncrementCount)
router.delete("/userprofile/cart/removeitem",authMiddleWare,removeItemFromCart)


module.exports = router