const router = require ('express').Router() ;
const UserRouter = require ('./user') ;
const ProductRouter = require ('./product') ;
const AdminRouter =require('./admin') ;


router.get('/', (req,res) => {
    res.status(200).json({
        message: "deploy success"
    })
})
router.use('/admin', AdminRouter) ;
router.use('/users', UserRouter) ;
router.use('/products', ProductRouter) ;



module.exports = router