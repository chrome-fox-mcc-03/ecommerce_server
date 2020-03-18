const router = require('express').Router()
const controller = require('../controllers/productController')
const authentication = require('../middlewares/authentication')


router.get('/', controller.get)
router.use(authentication)
router.post('/', controller.add)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)
module.exports = router