const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')
const { userAuthorization } = require('../middlewere/authorization')

router.post('/', CartController.add)
router.get('/', CartController.display)
router.patch('/increase/:cartId', userAuthorization, CartController.increase)
router.patch('/decrease/:cartId', userAuthorization, CartController.decrease)
router.delete('/:cartId', userAuthorization, CartController.delete)

module.exports = router