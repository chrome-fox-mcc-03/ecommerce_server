const routers = require('express').Router()
const UserController = require('../controllers/userController')
routers.post('/register',UserController.register)
routers.post('/login',UserController.login)

module.exports = routers