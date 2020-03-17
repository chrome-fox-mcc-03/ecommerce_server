const router = require('express').Router()
const ControllerUser = require('../controllers/User')

router.get('/', (req, res) => {
    console.log('masuk')
})
router.post('/login', ControllerUser.login)
router.post('/register', ControllerUser.register)

module.exports = router