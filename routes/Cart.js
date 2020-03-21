const express = require('express').Router
const router = express()
const Controller = require('../controller/Cart')
const auth = require('../middleware/authentication')
const autho = require('../middleware/authorized')

router.use(auth)
router.get('/cart',autho,Controller.findHistory)

module.exports = router