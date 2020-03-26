const express = require('express').Router
const router = express()
const Controller = require('../controller/product')
const authentaction = require('../middleware/authentication')
const authorized =require('../middleware/authorized')


router.get('/product',Controller.productFindAll)
router.get('/product/:id',Controller.productfindOne)

// router.use(authentaction)
router.post('/product',authentaction,authorized,Controller.productAdd)
router.delete('/product/:id',authentaction,authorized,Controller.productDelete)
router.patch('/product/:id',authentaction,authorized,Controller.productEdit)
router.post('/product/rate',authentaction,Controller.addRate)

module.exports = router