const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', CategoryController.findAll)
router.get('/:id', CategoryController.findOne)
router.use(authentication)
router.use(authorization)
router.post('/', CategoryController.create)
router.put('/:id',  CategoryController.edit)
router.delete('/:id', CategoryController.delete)

module.exports = router