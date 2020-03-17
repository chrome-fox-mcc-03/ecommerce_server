const router = require('express').Router()
const UserController = require('../controllers/UserController')
const authentification = require('../middlewares/authentification')
const ProductRoute = require('../routes/product')
const UserRoute = require('../routes/user')

router.post('/admin/login', UserController.login)
router.post('/admin/register', UserController.register)

router.use('/users', UserRoute)

router.use(authentification)

router.use('/products',ProductRoute)

module.exports = router