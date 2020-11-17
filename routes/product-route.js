const productRoute = require('express').Router()
const productController = require('../controller/productcontroller')
const authorization = require('../middleware/authorization')
const authentication = require('../middleware/authentication')

productRoute.use(authentication)
productRoute.get('/', productController.showAll)
productRoute.post('/create',authorization, productController.createProduct)
productRoute.put('/update/:id', productController.updateProduct)
productRoute.delete('/delete/:id',authorization, productController.deleteProduct)
//User ECMS PORTO 4
productRoute.get('/cart', authorization, productController.getCart)
productRoute.post('/cart', authorization, productController.addCart)
productRoute.put('/cart/:id', authorization, productController.updateCart),
productRoute.delete('/cart/:id', authorization, productController.deleteCart),
productRoute.get('/order', authorization, productController.getOrder)
productRoute.patch('/checkout', authorization, productController.checkout)


module.exports = productRoute