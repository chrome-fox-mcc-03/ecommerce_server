const router = require ('express').Router() ;
const ProductController = require ('../controllers/ProductController') ;
const authentication = require ('../middlewares/authentication') ;
const authorization = require ('../middlewares/authorization') ;

router.use (authentication) ;

router.get('/', ProductController.findAll) ;

// router.use (authorization) ;

// router.post('/', ProductController.create) ;
// router.put('/', ProductController.update) ;
// router.delete('/', ProductController.destroy) ;



module.exports = router