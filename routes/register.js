const router = require('express').Router()
const RegisterController = require('../controllers/RegisterController')

router.post('/register', RegisterController.register)

module.exports = router