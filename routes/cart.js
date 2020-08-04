const router = require('express').Router()
const Controller = require('../controllers/Cart')
const CartAuthorization = require('../middlewares/CartAuthorization')

router.get('/', Controller.findAll)
router.post('/', Controller.create)
router.patch('/:id', CartAuthorization, Controller.update)
router.delete('/:id', CartAuthorization, Controller.deleted)

module.exports = router