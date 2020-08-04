const router = require('express').Router()
const CartItemController = require('../controllers/CartItemController')
const authentication = require('../middlewares/authentication')
router.use(authentication)
router.get('/', CartItemController.findAll)
router.get('/checkout', CartItemController.checkout)
router.get('/:id', CartItemController.findOne)
router.post('/', CartItemController.create)
router.put('/:id',  CartItemController.edit)
router.delete('/:id', CartItemController.delete)

module.exports = router