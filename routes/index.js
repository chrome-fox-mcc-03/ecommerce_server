const router = require('express').Router()

const { UserController } = require('../controllers/UserControllers')
const { ProductController } = require('../controllers/ProductController')
const authentication = require('../middleware/authentication')


router.post('/register', UserController.register)
router.post('/login', UserController.login)

//product route
router.use(authentication)
router.post('/product', ProductController.addProduct) //add new product
router.put('/product', ProductController) //edit product


module.exports = router