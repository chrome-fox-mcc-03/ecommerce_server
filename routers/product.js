const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const { adminAuthorization }= require('../middlewares/authorization')

router.use(authentication)
router.get('/', ProductController.findAll)
router.post('/', adminAuthorization, ProductController.create)
router.get('/:id', ProductController.findOne)
router.put('/:id', adminAuthorization, ProductController.update)
router.delete('/:id', adminAuthorization, ProductController.delete)

module.exports = router