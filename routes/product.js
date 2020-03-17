const router = require ('express').Router() ;
const ProductController = require ('../controllers/ProductController') ;
const authentication = require ('../middlewares/authentication') ;
const authorization = require ('../middlewares/authorization') ;

router.use (authentication) ;

router.get('/', ProductController.findAll) ;
router.get('/:id', ProductController.findById) ;

router.use (authorization) ;

router.post('/', ProductController.create) ;
router.put('/:id', ProductController.update) ;
router.delete('/:id', ProductController.destroy) ;



module.exports = router