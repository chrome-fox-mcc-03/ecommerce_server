const router = require('express').Router();
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/', (req, res, next) => res.send("403 Forbidden"));
router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.use(authentication);
router.get('/products', ProductController.findAll);
router.get('/products/:id', ProductController.findOne);
router.post('/products', ProductController.create);

module.exports = router