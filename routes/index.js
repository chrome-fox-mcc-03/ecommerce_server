const router = require('express').Router();
const userController = require('../controllers/user');
const cartRouter = require('./cart');
const productRouter = require('./product');
const errorHandler = require('../middlewares/errorHandler');

router.get('/', (req, res) => res.send('Server is running'))
router.post('/admin/login', userController.adminLogin);
router.post('/admin/register', userController.adminRegister);
router.post('/customer/login', userController.customerLogin);
router.post('/customer/register', userController.customerRegister);
router.post('/google', userController.google);

router.use('/products', productRouter)
router.use('/carts', cartRouter)

router.use(errorHandler);

module.exports = router;