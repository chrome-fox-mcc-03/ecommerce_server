const router = require('express').Router()
const admin = require('./admin')
const product = require('./product')
const { isLogin } = require('../middlewares/authentication')

router.use('/admin', admin)
router.use(isLogin)
router.use('/admin/product', product)

module.exports = router