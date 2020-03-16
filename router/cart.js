'use strict'

const express = require('express');
const router = express.Router();
const { CartController } = require('../controllers/Cart');
const { Authentication } = require('../middlewares/Authentication');
const { Authorization } = require('../middlewares/Authorization');

router.use(Authentication.isAuthentic)

// Ref: UserId
router.get('/', CartController.findRecentProducts);
router.get('/cartHistory', CartController.cartHistory);

// Ref: CartId & ProductId

router.post('/add', Authorization.isCustomerAuthorized, CartController.createCart);
router.put('/checkOut', Authorization.isCustomerAuthorized, CartController.checkOut);
router.put('/:id', Authorization.isCustomerAuthorized, CartController.cartUpdate);
router.delete('/:id', Authorization.isCustomerAuthorized, CartController.emptyCart);


module.exports = { cartRouter: router }