const router = require('express').Router();
const CartController = require('../controllers/CartController');
const authentication = require('../middlewares/authentication');
const customerAuthorization = require('../middlewares/customerAuth');

router.use(authentication);

router.get('/', CartController.findCurrentItems);
router.get('/histories', CartController.history);

router.post('/', CartController.create);
router.put('/checkout', CartController.checkout);
router.put('/:id', customerAuthorization, CartController.update);
router.delete('/:id', customerAuthorization, CartController.destroy);

module.exports = router;