const router = require('express').Router();
const productRouter = require('./product');

const UserController = require('../controllers/UserController');
const authenticator = require('../middlewares/authenticator');

router.get('/', (req, res) => {
    res.status(200).json({message: "Ecommerce cms status online"})
})
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/userPayload', UserController.userPayload);

router.use(authenticator);

router.use('/product', productRouter);

module.exports = router;
