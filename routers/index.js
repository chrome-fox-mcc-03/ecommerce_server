const express = require('express')
const router = express.Router()
const user = require('./user')
const product = require('./product')
const category = require('./category')
const customers = require('./customer')

router.use(user)
router.use('/categories', category)
router.use('/products', product)
router.use('/customers/', customers)


module.exports = router