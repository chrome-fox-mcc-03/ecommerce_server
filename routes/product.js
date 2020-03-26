const router = require('express').Router()
const Controller = require('../controllers/Product')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

router.get('/', Controller.findAll)
router.use(authentication)
router.post('/', Controller.create)
router.patch('/:id', authorization, Controller.update)
router.delete('/:id', authorization, Controller.deleteProduct)

module.exports = router