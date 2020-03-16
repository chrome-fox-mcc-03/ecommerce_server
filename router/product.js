'use strict'

const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers/Product');
const { Authentication } = require('../middlewares/Authentication');
const { Authorization } = require('../middlewares/Authorization');

router.use(Authentication.isAuthentic);
router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findById);
router.post('/', Authorization.isAdminAuthorized, ProductController.createProduct);
router.put('/:id', Authorization.isAdminAuthorized, ProductController.updateProduct);
router.delete('/:id', Authorization.isAdminAuthorized, ProductController.deleteProduct)


module.exports = { productRouter: router }