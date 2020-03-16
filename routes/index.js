const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const errorsHandler = require('../middlewares/errorsHandler')


router.use('/users', userRouter)
router.use('/products', productRouter)
router.use(errorsHandler)



module.exports = router