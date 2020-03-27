const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const { adminAuthorization } = require('../middlewere/authorization')

router.post('/', ProductController.create)
router.get('/', ProductController.display)
router.get('/:id', ProductController.findOne)
router.put('/:id', adminAuthorization, ProductController.edit)
router.delete('/:id', adminAuthorization, ProductController.delete)

module.exports = router