const router = require('express').Router()
const controller = require('../controllers/productController')


router.post('/', controller.add)
router.get('/', controller.get)
module.exports = router