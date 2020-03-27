const router = require ('express').Router() ;
const UserRouter = require ('./user') ;
const ProductRouter = require ('./product') ;
const AdminRouter =require('./admin') ;
const CartRouter =require('./cart') ;
const ReviewRouter =require('./review') ;

router.use('/admin', AdminRouter) ;
router.use('/users', UserRouter) ;
router.use('/products', ProductRouter) ;
router.use('/carts', CartRouter) ;
router.use('/reviews', ReviewRouter) ;



module.exports = router