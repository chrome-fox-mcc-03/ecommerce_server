const routers = require('express').Router()
const UserController = require('../controllers/userController')
const Productcontroller = require('../controllers/productController')
routers.post('/register',UserController.register)
routers.post('/login',UserController.login)
routers.post('/loginAdmin',UserController.loginAdmin)

routers.post('/product',Productcontroller.addProduct)
routers.get('/product',Productcontroller.getProduct)
routers.get('/product/:id',Productcontroller.getProductById)
routers.put('/product/:id',Productcontroller.updateProduct)
routers.delete('/product/:id',Productcontroller.deleteProduct)
module.exports = routers