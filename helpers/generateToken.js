'use strict'

const webToken = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const generateToken = (payload) => {
    return webToken.sign(payload, SECRET);
}

const verifyToken = (token) => {
    return webToken.verify(token, SECRET)
}

module.exports = { generateToken, verifyToken }