const express = require('express')
const app = express()
const routers = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use(routers)


module.exports = app