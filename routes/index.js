"use strict"

const router = require('express').Router()
const productRouter = require('./productRoutes')
const authentication = require('../middlewares/authentication')
const userController = require('../controller/userController')
const storeController = require('../controller/storeController')
const authorization = require('../middlewares/authorization')

router.get('/register', userController.register)
router.get('/login', userController.login)
// router.get('/oAuth', userController.googleLogin)

router.user(authentication)
router.get('/user', userController.findUser)
router.put('/user', userController.editUser)

router.post('/store', storeController.createStore)
router.put('/store', authorization.checkRole, storeController.editStore)
router.use(productRouter)

module.exports = router

