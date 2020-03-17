const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.findAll)
router.post('/', ProductController.create)
router.get('/:id', ProductController.findOne)
const authorization = require('../middlewares/authorization')
router.put('/:id', authorization, ProductController.update)
router.delete('/:id', authorization, ProductController.delete)
module.exports = router