const express = require('express').Router
const router = express()
const Controller = require('../controller/product')
const authentaction = require('../middleware/authentication')
const authorized =require('../middleware/authorized')


router.use(authentaction)
router.get('/product',Controller.productFindAll)
router.get('/product/:id',Controller.productfindOne)

router.post('/product',authorized,Controller.productAdd)
router.delete('/product/:id',authorized,Controller.productDelete)
router.patch('/product/:id',authorized,Controller.productEdit)

module.exports = router