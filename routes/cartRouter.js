const router = require('express').Router()
const cartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const cartAuthorization = require('../middlewares/cartAuthorization')

router.use(authentication)
router.post('/', cartController.add)
router.get('/', cartController.get)
router.put('/:id', cartAuthorization , cartController.update)
router.delete('/:id', cartAuthorization , cartController.delete)

module.exports = router