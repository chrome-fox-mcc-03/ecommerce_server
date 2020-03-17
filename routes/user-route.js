const userRoute = require('express').Router()
const userController = require('../controller/usercontroller')

userRoute.post('/register', userController.Register)


module.exports = userRoute