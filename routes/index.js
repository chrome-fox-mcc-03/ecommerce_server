const router = require('express').Router()
const routerUser = require('./user')
const routerProduct = require('./product')
const authentication = require('../middlewares/authentication')

router.use('/user', routerUser)
router.use(authentication)
router.use('/product', routerProduct)

module.exports = router