const router = require('express').Router()
const CartController = require('../controllers/CartController')
const { authClient } = require('../middlewares/auth')

router.use(authClient)

router.get('/', CartController.findCart)

router.post('/addCart', CartController.addCart)

router.patch('/checkout', CartController.checkout)

router.get('/history', CartController.history)

module.exports = router