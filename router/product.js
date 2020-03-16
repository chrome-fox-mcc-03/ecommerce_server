'use strict'

const express = require('express');
const router = express.Router();
// Product Controller
// Aunthentication
// Authorization

router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findById);
router.post('/'.ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct)


module.exports = { productRouter: router }