const express = require('express')
const router = express.Router()
const UserRouter = require('./user')
const AdminRouter = require('./admin')
const ProductRouter = require('./product')

router.use('/user', UserRouter)
router.use('/admin', AdminRouter)
router.use('/product', ProductRouter)

module.exports = router