'use strict'

const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/User')

router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Google Auth



module.exports = { userRouter: router }