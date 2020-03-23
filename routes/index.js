const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const { isLogin } = require('../middlewares/authentication')

router.use('/', user)
router.use(isLogin)
router.use('/product', product)

module.exports = router