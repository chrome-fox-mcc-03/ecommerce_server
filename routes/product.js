const router = require('express').Router();
const ProductController = require('../controllers/product');
const authentication = require('../middlewares/authentication');
const { roleAuthorization } = require('../middlewares/authorization');

router.get('/', ProductController.getAll);
router.get('/:id(\\d+)', ProductController.getById);

router.use(authentication);
router.use(roleAuthorization);

router.post('/', ProductController.create)
router.put('/:id(\\d+)', ProductController.update);
router.delete('/:id(\\d+)', ProductController.delete);

module.exports = router;