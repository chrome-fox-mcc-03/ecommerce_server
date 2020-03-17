const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.fetchAll);
router.post('/', ProductController.create);

module.exports = router;