const router = require ('express').Router() ;
const CartController = require ('../controllers/CartController') ;
const authentication = require ('../middlewares/authentication') ;
const authorizationUser = require ('../middlewares/authorizationUser') ;

router.use(authentication)
router.get('/', CartController.findAllActive)
router.post('/', CartController.addToCart)

router.put('/:id', authorizationUser, CartController.reduceFromCart)
// router.delete('/:id', authorizationUser, CartController.deleteCart)

module.exports = router