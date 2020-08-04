const router = require('express').Router()
const routerUser = require('./user')
const routerProduct = require('./product')
const routerCart = require('./cart')
const authentication = require('../middlewares/authentication')

router.get('/', (req, res) => {
  res.send('helloooo')
})
router.use('/user', routerUser)
router.use('/product', routerProduct)
router.use(authentication)
router.use('/cart', routerCart)

module.exports = router