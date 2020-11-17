"use strict"

const router = require('express').Router()
const productRouter = require('./productRoutes')
const cartRouter = require('./cartRoutes')
const authentication = require('../middlewares/authentication')
const userController = require('../controller/userController')
const storeController = require('../controller/storeController')
const productController = require('../controller/productController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/loginCustomer', userController.loginCustomer)
router.post('/oAuth', userController.googleLogin)
router.get('/store/:name', storeController.findStore)
router.get('/highlighted', productController.findHighlighted)
router.get('/allProduct', productController.findAllProduct)

router.use(authentication)
router.use('/product', productRouter)
router.use('/cart', cartRouter)

module.exports = router

