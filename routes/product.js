const router = require('express').Router()
const ControllerProduct = require('./../controllers/controllerProduct')

router.get('/', ControllerProduct.getProducts)
router.post('/', ControllerProduct.create)
router.get('/:id', ControllerProduct.getById)
router.put('/:id', ControllerProduct.update)
router.delete('/:id', ControllerProduct.delete)

module.exports = router