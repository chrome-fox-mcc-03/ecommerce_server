const router = require('express').Router()
const ControllerCustomer = require('./../controllers/controllerCustomer')

router.post('/register', ControllerCustomer.register)
router.post('/login', ControllerCustomer.login)
router.get('/:id', ControllerCustomer.getById)
router.patch('/:id', ControllerCustomer.edit)
router.delete('/:id', ControllerCustomer.delete)

module.exports = router