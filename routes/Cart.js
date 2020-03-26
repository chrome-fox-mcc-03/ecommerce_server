const express = require('express').Router
const router = express()
const Controller = require('../controller/Cart')
const auth = require('../middleware/authentication')
const autho = require('../middleware/authorized')

router.get('/cart/category', Controller.category)
// router.use(auth)
router.get('/cart/history',auth,autho,Controller.findHistory)
router.post('/cart',auth,Controller.addToCart)
router.get('/cart',auth,Controller.findAll)
router.delete('/cart/:id',auth,Controller.deleted)
router.patch('/cart/desc/:id',auth,Controller.descQuanty)
router.get('/cart/checkout',auth,Controller.checkout)


module.exports = router