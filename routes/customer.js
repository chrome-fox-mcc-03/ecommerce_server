const router = require('express').Router()
const CustomerController = require('../controllers/CustomerController')
const customerAuthenticator = require('../middlewares/customer_auth')

router.get("/", CustomerController.status)
router.post("/register", CustomerController.register)
router.post("/login", CustomerController.login)

router.use(customerAuthenticator)
router.get("/shop", CustomerController.shop)
router.get("/cart", CustomerController.cart)
router.post("/cart", CustomerController.appendToCart)

module.exports = router