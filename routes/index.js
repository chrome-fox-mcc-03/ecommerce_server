const router = require('express').Router()

const { UserController } = require('../controllers/UserControllers')
const { ProductController } = require('../controllers/ProductController')
const authentication = require('../middleware/authentication')

//test connect
router.get('/', (req, res) => {
    res.send('Server is running')
})

//user route
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//product route
router.use(authentication)
router.get('/product', ProductController.fetchProduct) // fetch product
router.post('/product', ProductController.addProduct) // add new product
router.put('/product/:id', ProductController.editProduct) // edit product
router.delete('/product/:id', ProductController.deleteProduct) //delete product


module.exports = router