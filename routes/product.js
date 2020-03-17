const router = require('express').Router()
const Controller = require('../controllers/Product')
const checkRole = require('../middlewares/checkRole')
const authorization = require('../middlewares/authorization')

router.get('/', Controller.findAll)
router.use(checkRole)
router.post('/', Controller.create)
router.patch('/:id', Controller.update)
router.delete('/:id', Controller.deleteProduct)

module.exports = router