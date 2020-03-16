const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.fetchAll);

module.exports = router;