const router = require('express').Router()
const controller = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/login', controller.login)
router.use(authentication)
router.post('/register', authorization, controller.register)
module.exports = router