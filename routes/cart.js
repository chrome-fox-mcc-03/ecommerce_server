const router = require('express').Router();
const CartController = require('../controllers/cart');
const authentication = require('../middlewares/authentication');
const { customerAuth } = require('../middlewares/authorization');

router.use(authentication);

router.post('/', CartController.add);
router.post('/alt', CartController.addWithBody);
router.get('/', CartController.findAll);
router.patch('/increase/:cartId', customerAuth, CartController.increase);
router.patch('/decrease/:cartId', customerAuth, CartController.decrease);
router.delete('/:cartId', customerAuth, CartController.delete);
router.post('/checkout', CartController.checkout);

module.exports = router;