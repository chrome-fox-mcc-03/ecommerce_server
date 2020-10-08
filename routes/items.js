const router = require('express').Router()
const ItemController = require('../controllers/ItemController')
const { authAdmin } = require('../middlewares/auth')

router.get('/', ItemController.findAll)

router.post('/', authAdmin, ItemController.create)

router.get('/:itemId', ItemController.findByPk)

router.use(authAdmin)

router.put('/:itemId/update', ItemController.update)

router.delete('/:itemId/delete', ItemController.delete)

module.exports = router