const router = require('express').Router()
const controller = require('../controllers/productController')


router.post('/', controller.add)
module.exports = router