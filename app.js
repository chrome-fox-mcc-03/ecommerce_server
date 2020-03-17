if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') require('dotenv').config() 

const express = require('express') 
const app = express() 
const router = require('./routes') 
const error = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors()) 
app.use(express.urlencoded({ extended: false })) 
app.use(express.json()) 

app.use(router) 
app.use(error)


module.exports = app 