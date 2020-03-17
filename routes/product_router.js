const router = require('express').Router();
const ProductController = require('../controllers/product_controller');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization')

router.use(authentication);
router.post('/', ProductController.createProduct);
router.get('/', ProductController.showAll);

router.delete('/:id', authorization, ProductController.deleteById);
router.put('/:id', authorization, ProductController.editById);

module.exports = router;