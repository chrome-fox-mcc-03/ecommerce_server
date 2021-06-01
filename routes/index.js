const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const cart = require('./cart')
const { isLogin } = require('../middlewares/authentication')

router.use('/', user)
router.use(isLogin)
router.use('/cart', cart)
router.use('/product', product)

module.exports = router