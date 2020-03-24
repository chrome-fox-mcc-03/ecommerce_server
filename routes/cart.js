const router = require('express').Router();
const CartController = require('../controllers/cart');
const authentication = require('../middlewares/authentication');

router.use(authentication);

router.post('/', CartController.add);
router.get('/', CartController.findAll);
router.patch('/increase/:cartId', CartController.increase);
router.patch('/decrease/:cartId', CartController.decrease);
// router.delete('/:cartId', CartController.delete);

module.exports = router;