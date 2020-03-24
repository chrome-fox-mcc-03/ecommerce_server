const router = require ('express').Router() ;
const UserRouter = require ('./user') ;
const ProductRouter = require ('./product') ;
const AdminRouter =require('./admin') ;
const CartRouter =require('./cart') ;

router.use('/admin', AdminRouter) ;
router.use('/users', UserRouter) ;
router.use('/products', ProductRouter) ;
router.use('/carts', CartRouter) ;



module.exports = router