const express = require('express')
const router = express.Router()
const user = require('./user')
const product = require('./product')
const category = require('./category')

router.use(user)
router.use('/categories', category)
router.use('/products', product)


module.exports = router