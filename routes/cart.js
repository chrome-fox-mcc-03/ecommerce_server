const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')
const authorization = require('../middlewere/authorization')

router.post('/', CartController.add)
router.get('/', CartController.display)
router.patch('/increase/:cartId', authorization, CartController.increase)
router.patch('/decrease/:cartId', authorization, CartController.decrease)
router.delete('/:cartId', authorization, CartController.delete)

module.exports = router