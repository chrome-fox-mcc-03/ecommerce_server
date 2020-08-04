'use strict'

const webToken = require('jsonwebtoken');


const generateToken = (payload) => {
    return webToken.sign(payload, process.env.SECRET);
}

const verifyToken = (token) => {
    return webToken.verify(token, process.env.SECRET);
}

module.exports = { generateToken, verifyToken }