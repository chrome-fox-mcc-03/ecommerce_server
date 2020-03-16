const router = require('express').Router();
const productRouter = require('./product');

const UserController = require('../controllers/UserController');
const authenticator = require('../middlewares/authenticator');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(authenticator);
router.use('/product', productRouter);

module.exports = router;