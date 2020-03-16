'use strict'

if (process.env.NODE_ENV === 'development') require('dotenv').config;

const express = require('express');
const cors = require('cors');
const app = express();
// router
// ErrorHandler

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// router
// ErrorHandler


module.exports = { app }