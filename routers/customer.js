const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/customerController')
const authentication = require('../middlewares/authentication')

router.post('/register', CustomerController.register)
router.post('/login', CustomerController.login)

router.use(authentication)

router.get('/products', CustomerController.getCartCustomer)
router.post('/products/:productId', CustomerController.addNewProductToCart)
router.put('/products/:productId', CustomerController.updateQuantity)
router.delete('/products/:productId', CustomerController.deleteItem)
router.post('/checkout', CustomerController.checkout)

// router.delete('/cart', CostumerController.cancelProduct)
// router.get('/cart', CostumerController.cart)
// router.post('/cart', CostumerController.buy)

module.exports = router