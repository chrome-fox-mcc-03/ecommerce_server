const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, process.env.key)
}

function verify(token) {
    return jwt.verify(token, process.env.key)
}

module.exports = {
    generateToken,
    verify
}