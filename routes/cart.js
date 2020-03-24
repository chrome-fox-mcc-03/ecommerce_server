const router = require('express').Router()
const { addCart, findAllCart, updateAmount, deleteCart, findAllHistory, checkoutCart } = require('../controllers/cart')
const { isYours } = require('../middlewares/authorization')

router.post('/', addCart)
router.get('/', findAllCart)
router.put('/', checkoutCart)
router.patch('/:id', isYours, updateAmount)
router.delete('/:id', isYours, deleteCart)
router.get('/history', findAllHistory)

module.exports = router