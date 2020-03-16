const ControllerUser = require('./../controllers/controllerUser')
const router = require('express').Router()

router.get('/', ControllerUser.getAllUser)
router.get('/:id', ControllerUser.getById)
router.put('/:id', ControllerUser.update)
router.delete('/:id', ControllerUser.delete)

module.exports = router