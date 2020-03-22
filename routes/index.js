const router = require('express').Router()
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.use('/products', authentication)
router.post('/products/create', productController.create)
router.get('/products/read', productController.read)
router.put('/products/update/:id', productController.update)
router.delete('/products/delete/:id', productController.delete)

module.exports = router