const router = require('express').Router();
const ProductController = require('../controllers/product_controller');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization')

router.get('/customer', ProductController.showCustomer);

router.use(authentication);
router.get('/', ProductController.showAll);
router.post('/', ProductController.createProduct);
router.get('/:id', ProductController.findById);

router.delete('/:id', authorization, ProductController.deleteById);
router.put('/:id', authorization, ProductController.editById);

module.exports = router;