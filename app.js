const express = require('express')
const app = express()
const router = require('./routes/index')
const errorHandles = require('./middlewares/errorHandles')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(router)
app.use(errorHandles)

module.exports = app