const router = require('express').Router()

const { UserController } = require('../controllers/UserControllers')
const { ProductController } = require('../controllers/ProductController')
const authentication = require('../middleware/authentication')

//user route
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//product route
router.use(authentication)
router.get('/product', ProductController.fetchProduct) // fetch product
router.post('/product', ProductController.addProduct) // add new product
router.put('/product', ProductController.editProduct) // edit product
router.delete('/product', ProductController.deleteProduct) //delete product


module.exports = router