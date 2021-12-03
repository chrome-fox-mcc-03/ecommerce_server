const router = require('express').Router();
const ControllerCart = require('../controllers/cart')
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorizationCustomer')

router.use(authentication)

router.get('/', ControllerCart.findAll)

router.post('/', ControllerCart.addToCart)

router.put('/:id', authorization, ControllerCart.update)

router.delete('/:id', authorization, ControllerCart.delete)


module.exports = router