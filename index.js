const express = require("express")
const app = express()
const homeRouter = require("./routes/homeRouter.js")
const userRouter = require("./routes/userRouter.js")
const productRouter = require("./routes/productRouter.js")
const db_url = "mongodb://127.0.0.1:27017/E-Commerce"
const connectDB = require("./connection.js")
const cookieParser = require("cookie-parser")
const port = 3000
const cors = require("cors")

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

connectDB(db_url)

app.use("/home",homeRouter)
app.use("/user",userRouter)
app.use("/product",productRouter) 

app.listen(port,()=>{ console.log(`The server is started at ${port} port`) })