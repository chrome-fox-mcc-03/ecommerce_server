const router = require('express').Router()
const ControllerUser = require('./../controllers/controllerUser')
const authentication = require('./../middlewares/authentication')
const userRoutes = require('./user')
const productRoutes = require('./product')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.use(authentication)
router.use('/users', userRoutes)
router.use('/products', productRoutes)

module.exports = router