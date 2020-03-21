const express = require('express').Router;
const router = express()
const Controller = require('../controller/user')

router.post('/register',Controller.registerAdmin)
router.post('/login',Controller.loginAdmin)

module.exports = router