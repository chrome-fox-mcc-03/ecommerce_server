const productRoute = require('express').Router()
const productController = require('../controller/productcontroller')
const authorization = require('../middleware/authorization')
const authentication = require('../middleware/authentication')

productRoute.use(authentication)
productRoute.get('/', productController.showAll)
productRoute.post('/create',authorization, productController.createProduct)
productRoute.put('/update/:id', productController.updateProduct)
productRoute.delete('/delete/:id',authorization, productController.deleteProduct)



module.exports = productRoute