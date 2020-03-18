const router = require('express').Router();
const ProductController = require('../controllers/product');
const authentication = require('../middlewares/authentication');

router.use(authentication);

router.post('/', ProductController.add);
router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router