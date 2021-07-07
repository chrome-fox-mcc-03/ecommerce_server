const express = require('express')
const app = express()
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors")
const router = require("./routes/index.js")
const morgan = require("morgan")

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(router)
app.use(express.static(__dirname + '/static'))
app.use(errorHandler)

module.exports = app