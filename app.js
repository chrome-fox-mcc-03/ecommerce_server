const express = require('express')
const app = express()
// const {User} = require('./models')
const {errorHandler} = require('./middlewares/errorHandler')
const routers = require('./routes/index')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(routers)

app.use(errorHandler)

module.exports = app