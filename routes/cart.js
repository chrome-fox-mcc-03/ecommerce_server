const router = require('express').Router();
const CartController = require('../controllers/cartController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/userAuthorization');


router.use(authentication)
router.get('/', CartController.get)

router.post('/', CartController.create)
router.put('/:id', authorization, CartController.update)
router.delete('/:id', authorization, CartController.delete)


module.exports = router;