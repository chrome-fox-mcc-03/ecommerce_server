const express = require('express')
const router = express.Router()
const UserRouter = require('./user')
const AdminRouter = require('./admin')
const ProductRouter = require('./product')
const CartRouter = require('./cart')
const authentication = require('../middlewere/authentication')

router.use('/user', UserRouter)
router.use('/admin', AdminRouter)
router.use(authentication)
router.use('/product', ProductRouter)
router.use('/cart', CartRouter)

module.exports = router