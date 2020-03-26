"use strict"

const router = require('express').Router()
const cartController = require('../controller/cartController')

router.post('/', cartController.addToCart)
router.get('/', cartController.findAllCart)
router.put('/', cartController.editQuantity)
router.delete('/', cartController.deleteCartProduct)
router.put('/checkOut', cartController.finishOrder)

module.exports = router