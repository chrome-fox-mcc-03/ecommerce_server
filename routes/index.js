const router = require('express').Router()
const userRouter = require('./userRouter')
const errorsHandler = require('../middlewares/errorsHandler')


router.use('/users', userRouter)
router.use(errorsHandler)



module.exports = router