const router = require('express').Router()
const ControllerCart = require('./../controllers/controllerCart')
const authenticationCust = require('./../middlewares/authenticationCust')
const { authorizationCart } = require('./../middlewares/authorizationCust')

router.use(authenticationCust)
router.get('/', ControllerCart.fetchAll)
router.post('/', ControllerCart.addCart)
router.get('/:id', authorizationCart, ControllerCart.getById)
router.patch('/:id', authorizationCart, ControllerCart.update)
router.delete('/:id', authorizationCart, ControllerCart.delete)

module.exports = router