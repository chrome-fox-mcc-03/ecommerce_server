const CartController = require('../controllers/cart');
const router = require('express').Router();
const { customerAuthorization } = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');

router.use(authentication)
router.get('/', CartController.getCart);
router.post('/', CartController.addToCart);

router.use('/:id(\\d+)', customerAuthorization);
router.put('/:id(\\d+)', CartController.update);
router.delete('/:id(\\d+)', CartController.delete);
router.put('/pay', CartController.pay);
router.get('/history', CartController.getHistory);

module.exports = router