const router = require('express').Router();
const CartController = require('../controllers/CartController');
const authentication = require('../middlewares/authentication');
const customerAuthorization = require('../middlewares/customerAuth');

router.use(authentication);

// based on user id (token)
router.get('/', CartController.findCurrentItems);
router.get('/histories', CartController.history);

// based on cartId and productId
router.post('/', CartController.create);
router.put('/checkout', CartController.checkout);
router.put('/:id', customerAuthorization, CartController.update);
router.delete('/:id', customerAuthorization, CartController.destroy);

module.exports = router;