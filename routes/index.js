const router = require('express').Router()
const admin = require('./user')
const product = require('./product')
const { isLogin } = require('../middlewares/authentication')

router.use('/', admin)
router.use(isLogin)
router.use('/admin/product', product)

module.exports = router