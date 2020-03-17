const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/index.js')
const errhandler = require("./middleware/errhandler")
if(process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/', router)




app.use(errhandler)
module.exports = app