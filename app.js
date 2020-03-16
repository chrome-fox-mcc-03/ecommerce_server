'use strict'

if (process.env.NODE_ENV === 'development') require('dotenv').config;

const express = require('express');
const cors = require('cors');
const app = express();
const { router } = require('./router')
const { ErrorHandler } = require('./middlewares/ErrorHandler')

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router)
app.use(ErrorHandler.errHandling);


module.exports = { app }