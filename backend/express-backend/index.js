const express = require("express")
const bodyParser = require("body-parser")
const mongoDbConnectionString = require("./config/mongodb")
const mongoose = require("mongoose")
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const authMiddleware = require("./middleware/auth")
const PORT = 4000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/auth",authRouter)
app.use("*", authMiddleware)
app.use("/users",userRouter)

mongoose
    .connect(mongoDbConnectionString)
    .then(result => {
        console.log("Connected to MongoDB")
        app.listen(PORT, () => {
            console.log("Server is listening on PORT: " + PORT)
        })
    })
    .catch(err => {
        console.error(err)
    })

