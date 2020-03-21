const router = require('express').Router();
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const adminAuth = require('../middlewares/adminAuth.js');

router.get('/', (req, res, next) => res.send("403 Forbidden"));
router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.use(authentication);
router.get('/products', ProductController.findAll);
router.get('/products/:id', ProductController.findOne);

router.use(adminAuth)
router.post('/products', ProductController.create);
router.put('/products/:id', authorization, ProductController.update);
router.delete('/products/:id', authorization, ProductController.delete)

module.exports = router