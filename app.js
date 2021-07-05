const express = require('express')
const app = express()
const cors = require('cors')
const errorHandler = require('./middlewere/errorhandler')
const router = require('./routes/index')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errorHandler)

module.exports = app