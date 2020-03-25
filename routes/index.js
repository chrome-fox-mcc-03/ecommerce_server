const router = require('express').Router()

const users = require('./users')
const items = require('./items')
const categories = require('./categories')
const carts = require('./carts')

router.use('/', users)
router.use('/items', items)
router.use('/categories', categories)
router.use('/carts', carts )

module.exports = router