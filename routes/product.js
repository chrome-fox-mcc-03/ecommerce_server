const router = require('express').Router();
const ProductController = require('../controllers/product');

router.post('/', ProductController.add);
router.get('/', ProductController.findAll);

module.exports = router