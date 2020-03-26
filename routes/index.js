const router = require('express').Router()
const UserController = require('../controllers/UserController')
const product_routes = require('../routes/product_routes')
const category_routes = require('../routes/category_routes')
const cart_item_routes = require('../routes/cartItem_routes')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/products', product_routes)
router.use('/categories', category_routes)
router.use('/cartitems', cart_item_routes)

module.exports = router