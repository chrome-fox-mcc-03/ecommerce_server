const express = require('express').Router;
const router = express()
const Controller = require('../controller/user')
const auth = require('../middleware/authentication')

router.post('/register',Controller.registerAdmin)
router.post('/login',Controller.loginAdmin)
router.post('/registerUser',Controller.RegisterUser)
router.post('/loginUser',Controller.loginUser)

// router.use(auth)
// router.patch('/picture',Controller.addPicture)

module.exports = router