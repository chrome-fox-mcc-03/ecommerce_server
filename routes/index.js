const router = require('express').Router()
const Cart = require('../controllers/cart')
const User = require('../controllers/user')
const Product = require('../controllers/product')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.post('/register', User.register)
router.post('/login', User.login)  // User.login

// router.use(Authentication)

router.get('/catalogues', Product.findAll)
router.post('/catalogues', Product.create)
router.get('/catalogues/:id', Product.findOne)
router.put('/catalogues/:id', Product.update)
router.patch('/catalogues/:id', Product.patchStocks)
router.delete('/catalogues/:id', Product.destroy)

router.post('/carts', Cart.create)
router.get('/carts', Cart.findAll)
router.get('/carts/:id', Cart.findOne)
router.delete('/carts/:id', Authorization, Cart.destroy)



module.exports = router