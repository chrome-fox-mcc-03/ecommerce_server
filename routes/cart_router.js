const router = require('express').Router();
const CartController = require('../controllers/cart_controller');
const authenticate = require('../middlewares/authentication');
const authorize = require('../middlewares/authorizationCart');


router.use(authenticate);
router.get('/', CartController.showAll);
router.post('/:id', CartController.addCart);
router.patch('/:id', authorize, CartController.editCart);
router.delete('/:id', authorize, CartController.deleteCart);

module.exports = router;