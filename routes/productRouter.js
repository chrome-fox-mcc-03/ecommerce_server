const router = require('express').Router()
const controller = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.get('/', controller.get)
router.use(authentication)
router.post('/', controller.add)
router.put('/:id', controller.update)
router.delete('/:id', authorization, controller.delete)
module.exports = router