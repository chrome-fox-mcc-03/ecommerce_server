const router = require('express').Router()

const { UserController } = require('../controllers/UserControllers')
const { ProductController } = require('../controllers/ProductController')
const { CartController } = require('../controllers/CartController')
const { CartItemController } = require('../controllers/CartItemController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

//test connect
router.get('/', (req, res) => {
    res.send('Server is running')
})

//user Cust route
router.post('/register/:email', UserController.register)
router.post('/login/:email', UserController.login)


//user Admin route
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//product route
router.get('/product', ProductController.fetchProduct) // fetch product
router.get('/product/:id', ProductController.findOneProduct)

router.use(authentication)
router.post('/product', ProductController.addProduct) // add new product
router.put('/product/:id', ProductController.editProduct) // edit product
router.delete('/product/:id', ProductController.deleteProduct) //delete product

//cart route
router.post('/cart', CartController.createCart)
router.delete('/cart', authorization, CartController.removeCart)
router.get('/cartitem', authorization, CartItemController.fetchCart)
router.post('/addtocart', authorization, CartItemController.addToCart)
router.delete('/cartitem/:id', authorization, CartItemController.removeOneItem)
router.delete('/cartitem', authorization, CartItemController.removeAll)



module.exports = router