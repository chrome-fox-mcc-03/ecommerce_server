const router = require('express').Router();
const ProductController = require('../controllers/productController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');


router.use(authentication)
router.get('/', ProductController.get)
router.get('/:id', ProductController.getById)


router.post('/', authorization, ProductController.create)
router.put('/:id', authorization, ProductController.update)
router.delete('/:id', authorization, ProductController.delete)


module.exports = router;