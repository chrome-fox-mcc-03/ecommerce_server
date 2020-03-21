"use strict"

const router = require('express').Router()
const productRouter = require('./productRoutes')
const authentication = require('../middlewares/authentication')
const userController = require('../controller/userController')
const storeController = require('../controller/storeController')
const authorization = require('../middlewares/authorization')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/oAuth', userController.googleLogin)
router.get('/store/:name', storeController.findStore)

router.use(authentication)
router.use('/product', productRouter)

module.exports = router

