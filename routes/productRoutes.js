"use strict"

const router = require('express').Router()
const productController = require('../controller/productController')
const authorization = require('../middlewares/authorization')

router.post('/:storeId', authorization.checkRole, productController.createProduct)
router.put('/:id', productController.editProduct)
router.delete('/:id', authorization.checkRole, productController.deleteProduct)
router.get('/:storeId', productController.findProduct)
router.get('/:storeId/category', productController.findCategory)

module.exports = router