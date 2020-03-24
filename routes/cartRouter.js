const router = require('express').Router()
const cartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', cartController.add)
router.get('/', cartController.get)

module.exports = router