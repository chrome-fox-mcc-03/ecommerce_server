const router = require('express').Router();
const product = require('./product');
const user = require('./user');
const cart = require('./cart')
const ControllerCart = require('../controllers/cart')

router.put('/checkout', ControllerCart.checkOut)

router.use(user)

router.use("/products", product)

router.use("/carts", cart)

module.exports = router