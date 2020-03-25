const router = require('express').Router()
const AdminController = require('../controllers/AdminController')
const ProductRoute = require('../routes/product')
const UserRoute = require('../routes/user')
const CartRoute = require('./cart')
const CartController = require('../controllers/CartController')
const authentification = require('../middlewares/authentification')

router.get('/', (req, res) => res.send('SERVER RUNNING'))

router.post('/admin/login', AdminController.login)

router.use('/users', UserRoute)

router.use(authentification)


router.get('/cart', CartController.findAll)
router.put('/cart', CartController.update)

router.use('/carts', CartRoute)

router.use('/products',ProductRoute)

module.exports = router