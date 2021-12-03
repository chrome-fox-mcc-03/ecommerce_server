const router = require('express').Router();
const ControllerProduct = require('../controllers/product');
const authentication = require('../middlewares/authentication');
const authorization  = require('../middlewares/authorization');

router.get('/', ControllerProduct.findAll)

router.use(authentication)

router.post('/', authorization, ControllerProduct.create)

router.get('/:id', authorization, ControllerProduct.findOne)

router.put('/:id', authorization, ControllerProduct.update)

router.delete('/:id', authorization, ControllerProduct.delete)

module.exports = router