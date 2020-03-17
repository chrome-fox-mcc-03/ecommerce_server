const router = require('express').Router()
const registerRouter = require('./register')
const loginRouter = require('./login')
const productRouter = require('./product')

router.use('/', registerRouter)
router.use('/', loginRouter)
router.use('/products', productRouter)

module.exports = router
