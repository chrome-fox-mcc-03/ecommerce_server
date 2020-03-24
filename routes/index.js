const router = require('express').Router()
const ControllerUser = require('./../controllers/controllerUser')
const authenticationAdmin = require('../middlewares/authenticationAdmin')
const userRoutes = require('./user')
const productRoutes = require('./product')
const customerRoutes = require('./customer')
const cartRoutes = require('./cart')

// router.use('/customers', customerRoutes)
// router.use('/carts', cartRoutes)
router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.use(authenticationAdmin)
router.use('/users', userRoutes)
router.use('/products', productRoutes)

module.exports = router