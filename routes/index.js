const router = require('express').Router()
const Controller = require('./../controllers/controller')
const authentication = require('./../middlewares/authentication')
const userRoutes = require('./user')
const productRoutes = require('./product')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.use(authentication)
router.use('/users', userRoutes)
router.use('/products', productRoutes)

module.exports = router