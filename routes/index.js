const router = require('express').Router()
const routerUser = require('./user')
const routerProduct = require('./product')

router.get('/', (req, res) => {
  res.send('helloooo')
})
router.use('/user', routerUser)
router.use('/product', routerProduct)

module.exports = router