if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const cors = require('cors');
const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routers/index')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

app.listen(process.env.PORT, _=> console.log(`Hi there! You're listening to radio ${process.env.PORT}`))

module.exports = app