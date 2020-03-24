const router = require('express').Router();
const UserController = require('../controllers/user');
const errorHandler = require('../middlewares/errorHandler');
const productRoutes = require('../routes/product');
const cartRoutes = require('../routes/cart');

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.post('/signin/admin', UserController.signInAdmin);

router.use('/products', productRoutes);
router.use('/carts', cartRoutes);

router.use(errorHandler);

module.exports = router