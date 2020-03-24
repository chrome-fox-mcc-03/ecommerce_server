const router = require('express').Router()
const ControllerCustomer = require('./../controllers/controllerCustomer')
const authenticationCust = require('./../middlewares/authenticationCust')

router.post('/register', ControllerCustomer.register)
router.post('/login', ControllerCustomer.login)
router.use(authenticationCust)
router.get('/:id', ControllerCustomer.getById)
router.patch('/:id', ControllerCustomer.edit)
router.delete('/:id', ControllerCustomer.delete)

module.exports = router