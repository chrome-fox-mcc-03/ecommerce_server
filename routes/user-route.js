const userRoute = require('express').Router()
const userController = require('../controller/usercontroller')

userRoute.post('/register', userController.Register)
userRoute.post('/login', userController.Login)


module.exports = userRoute