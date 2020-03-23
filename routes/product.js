const router = require('express').Router()
const { createProduct, findAllProduct, updateProduct, deleteProduct, findOneProduct } = require('../controllers/product')
const { isAdmin, isExist } = require('../middlewares/authorization')

router.get('/', findAllProduct)
router.get('/:id', isExist, findOneProduct)
router.use(isAdmin)
router.post('/', createProduct)
router.put('/:id', isExist, updateProduct)
router.delete('/:id', isExist, deleteProduct)

module.exports = router