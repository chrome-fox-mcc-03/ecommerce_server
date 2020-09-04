const router = require('express').Router()
const ControllerProduct = require('./../controllers/controllerProduct')
const authenticationAdmin = require('../middlewares/authenticationAdmin')

router.use(authenticationAdmin)
router.get('/', ControllerProduct.getProducts)
router.get('/:id', ControllerProduct.getById)
router.post('/', ControllerProduct.create)
router.put('/:id', ControllerProduct.update)
router.delete('/:id', ControllerProduct.delete)

module.exports = router