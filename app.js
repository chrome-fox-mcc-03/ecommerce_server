if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const routes = require('./routes')
const errHandler = require('./middlewares/errHandler')

app.use(routes)
app.use(errHandler)

module.exports = app