const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/login', userController.adminLogin)
router.post('/register', userController.adminRegister)

module.exports = router