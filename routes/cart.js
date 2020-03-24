const router = require('express').Router();
const CartController = require('../controllers/cart');
const authentication = require('../middlewares/authentication');

router.use(authentication);

router.post('/', CartController.add);
router.get('/', CartController.findAll);

module.exports = router;