const router = require('express').Router()
const CartProductController = require('../controllers/CartProductController')
router.get('/', CartProductController.findAll)
router.post('/checkout', CartProductController.checkout)
router.post('/:id', CartProductController.create)
router.delete('/:id', CartProductController.deleteCart)
router.post('/:id/add', CartProductController.increment)
router.post('/:id/minus', CartProductController.decrement)

module.exports = router