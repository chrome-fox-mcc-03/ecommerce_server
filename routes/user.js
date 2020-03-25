const ControllerUser = require('./../controllers/controllerUser')
const router = require('express').Router()
const authenticationAdmin = require('../middlewares/authenticationAdmin')

router.use(authenticationAdmin)
router.put('/:id', ControllerUser.update)
router.delete('/:id', ControllerUser.delete)

module.exports = router