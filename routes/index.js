const router = require('express').Router()

const { UserController } = require('../controllers/UserControllers')
const { ProductController } = require('../controllers/ProductController')
const authentication = require('../middleware/authentication')

//user route
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//product route
// router.use(authentication)
router.get('/product', ProductController.fetchProduct)
router.post('/product', ProductController.addProduct) //add new product
// router.put('/product', ProductController) //edit product


module.exports = router