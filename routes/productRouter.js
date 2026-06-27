const express = require("express")
const { handleSingleProduct } = require("../controllers/staticControllers.js")
const authMiddleWare = require("../middlewares/authMiddleware.js")
const router = express.Router()

router.get("/:id",authMiddleWare,handleSingleProduct)

module.exports = router