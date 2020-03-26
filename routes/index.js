const express = require('express').Router;
const router = express()
const user = require('./user')
const production = require('./product')
const history = require('./Cart')

router.use(user)
router.use(history)
router.use(production)

module.exports =router