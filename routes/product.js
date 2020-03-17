const router = require('express').Router()
const { createProduct, findAllProduct, updateProduct, deleteProduct, findOneProduct } = require('../controllers/product')
const { isAdmin, isExist } = require('../middlewares/authorization')

router.use(isAdmin)
router.post('/', createProduct)
router.get('/', findAllProduct)
router.put('/:id', isExist, updateProduct)
router.delete('/:id', isExist, deleteProduct)
router.get('/:id', isExist, findOneProduct)

module.exports = router