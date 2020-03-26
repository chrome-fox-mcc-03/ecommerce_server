const router = require('express').Router()
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const purchaseController = require('../controllers/purchaseController')
const { authenticationAdmin, authenticationUser } = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.use('/products', authenticationAdmin)
router.post('/products/create', productController.create)
router.get('/products/read', productController.read)
router.put('/products/update/:id', productController.update)
router.delete('/products/delete/:id', productController.delete)

router.use('/purchase', authenticationUser)
router.create('/purchase/add-to-cart/:id', purchaseController.add)
router.delete('/purchase/remove-from-cart/:id', authorization, purchaseController.remove)
router.put('/purchase/checkout', purchaseController.checkout)
router.get('/purchase/cart', purchaseController.getCart)

module.exports = router