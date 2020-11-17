const router = require('express').Router();
const userRouter = require('./user_router');
const productRouter = require('./product_router');
const adminRouter = require('./admin_router');
const cartRouter = require('./cart_router');

router.use('/users', userRouter);
router.use('/admins', adminRouter);
router.use('/products', productRouter);
router.use('/carts', cartRouter);

module.exports = router;