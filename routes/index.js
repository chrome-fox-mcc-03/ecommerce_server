const router = require('express').Router();
const productRouter = require('./product');;
const UserController = require('../controllers/userController');


router.get('/', function (req, res) {
	res.send('Welcome to E-Commerce CMS Server')
})

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.use('/product', productRouter)

module.exports = router;