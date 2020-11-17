const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const customerRouter = require('./customerRouter')
const cartRouter = require('./cartRouter')
const errorsHandler = require('../middlewares/errorsHandler')


router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/customers', customerRouter)
router.use('/carts', cartRouter)
router.use(errorsHandler)



module.exports = router