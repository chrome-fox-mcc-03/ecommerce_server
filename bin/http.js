"use strict"
if(process.env.NODE_ENV === 'development') require('dotenv').config()

const app = require('../app')
const http = require('http').createServer(app)

http.listen(process.env.PORT, () => console.log('You are now listenin to port', process.env.PORT))