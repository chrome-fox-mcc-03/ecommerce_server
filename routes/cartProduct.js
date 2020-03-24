const ControllerCartProduct = require('./../controllers/controllerCartProduct')
const router = require('express').Router()
const authenticationCust = require('./../middlewares/authenticationCust')
const { authorizationCartProduct } = require('./../middlewares/authorizationCust')

router.use(authenticationCust)
router.get('/', ControllerCartProduct.fetchAll)
router.post('/', ControllerCartProduct.addCartProduct)
router.get('/:id', authorizationCartProduct, ControllerCartProduct.getById)
router.patch('/:id', authorizationCartProduct, ControllerCartProduct.update)
router.delete('/:id', authorizationCartProduct, ControllerCartProduct.delete)

module.exports = router