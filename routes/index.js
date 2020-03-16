const router = require('express').Router()
const Controller = require('./../controllers/controller')
const authentication = require('./../middlewares/authentication')
const userRoutes = require('./user')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.use(authentication)
router.use('/users', userRoutes)

module.exports = router