const router = require ('express').Router() ;
const CartController = require ('../controllers/CartController') ;
const authentication = require ('../middlewares/authentication') ;
// const authorizationUser = require ('../middlewares/authorizationUser') ;

router.use(authentication)
router.get('/', CartController.findAll)
// router.post('/', CartController.createCart)

// router.put('/:id', authorizationUser, CartController.editCart)
// router.delete('/:id', authorizationUser, CartController.deleteCart)

module.exports = router