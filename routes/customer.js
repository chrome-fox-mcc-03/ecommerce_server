const router = require('express').Router()
const CustomerController = require('../controllers/CustomerController')
const customerAuthenticator = require('../middlewares/customer_auth')
const { customerAuthorizator } = require('../middlewares/authorizator')

router.get("/", CustomerController.status)
router.post("/register", CustomerController.register)
router.post("/login", CustomerController.login)

router.use(customerAuthenticator)
router.get("/shop", CustomerController.shop)
router.get("/cart", CustomerController.cart)
router.post("/cart", CustomerController.appendToCart)
// otorisasi
router.delete("/cart/:id", customerAuthorizator, CustomerController.removeFromCart)
router.patch("/cart/:id", customerAuthorizator, CustomerController.updateCartQty)

module.exports = router