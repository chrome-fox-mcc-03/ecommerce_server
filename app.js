const express = require('express')
const app = express()
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors")
const router = require("./routes/index.js")


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(router)
app.use(errorHandler)

module.exports = app