const express = require('express')
const cors = require('cors')
const app = express()
const routers = require('./routes/index')

app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(routers)


module.exports = app