const jwt = require('jsonwebtoken');

function tokenGenerate(payload) {
    return jwt.sign(payload, process.env.TOKEN_ID)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.TOKEN_ID)
}

module.exports = {
    tokenGenerate,
    verifyToken
}