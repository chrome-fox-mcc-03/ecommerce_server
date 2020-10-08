const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const { adminAuthorizator } = require('../middlewares/authorizator');

router.get('/', ProductController.fetchAll);
router.post('/', ProductController.create);

router.use(adminAuthorizator)
router.put('/:productId', ProductController.editItem);
router.delete('/:productId', ProductController.deleteItem);

module.exports = router;