const router = require ('express').Router() ;
const UserRouter = require ('./user') ;
const ProductRouter = require ('./product') ;
const AdminRouter =require('./admin') ;


router.use('/admin', AdminRouter) ;
router.use('/users', UserRouter) ;
router.use('/products', ProductRouter) ;



module.exports = router