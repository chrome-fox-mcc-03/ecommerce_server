const router = require('express').Router();
const userRouter = require('./user_router');
const productRouter = require('./product_router');
const adminRouter = require('./admin_router');

router.use('/users', userRouter);
router.use('/admins', adminRouter);
router.use('/products', productRouter);

module.exports = router;