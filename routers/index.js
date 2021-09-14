const router = require('express').Router();
// const UserController = require('../controllers/UserController');
// const CartController = require('../controllers/CartController');
// const ProductController = require('../controllers/ProductController')
// const CartProductController = require('../controllers/CartProductController')
const { UserController, CartController, ProductController, CartProductController} = require('../controllers/index')
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const adminAuth = require('../middlewares/adminAuth.js');
  
router.get('/', (req, res, next) => res.send("403 Forbidden"));
router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.use(authentication);
router.get('/products', ProductController.findAll);
router.get('/products/:id', ProductController.findOne);

router.use(authorization)
router.post('/products/:id', CartProductController.addToCart) // Add item to User's cart
router.get('/carts', CartProductController.findPerUser) // Find item(s) in User's cart
router.put('/carts/payall', CartProductController.payall) // Pay all item in User's cart
router.delete('/carts/:id', CartProductController.delete) // Delete item(s) in User's cart
router.put('/carts/:id', CartProductController.pay) // Pay the item in User's cart

router.use(adminAuth)
router.post('/products', ProductController.create);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete)

module.exports = router