const customerController = require('../controllers/customerController')
const router = require('express').Router()



router.post('/register', customerController.register)
router.post('/login', customerController.login)



module.exports = router