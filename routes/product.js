const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')

router.post('/', ProductController.create)
router.get('/', ProductController.display)
router.get('/:id', ProductController.findOne)
router.put('/:id', ProductController.edit)
router.delete('/:id', ProductController.delete)

module.exports = router