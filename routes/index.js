const router = require('express').Router();
const userController = require('../controllers/user');
const userRouter = require('./user');
const productRouter = require('./product');
const errorHandler = require('../middlewares/errorHandler');

router.post('/admin/login', userController.adminLogin);
router.post('/admin/register', userController.adminRegister);
router.post('/customer/login', userController.customerLogin);
router.post('/customer/register', userController.customerRegister);
router.post('/google', userController.google);

router.use('/products', productRouter)

router.use(errorHandler);

module.exports = router;