const router = require('express').Router()
const UserController = require('../controllers/UserController')
const product_routes = require('../routes/product_routes')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/products',product_routes)
module.exports = router