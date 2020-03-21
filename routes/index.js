const express = require('express').Router;
const router = express()
const user = require('../routes/user')
const production = require('./product')

router.use(user)
router.use(production)

module.exports =router