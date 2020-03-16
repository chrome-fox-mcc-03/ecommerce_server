const jwt = require('jsonwebtoken');

function getToken (payload) {
    return jwt.sign(payload, 'hacktivsecret')
}

function verifyToken (token ) {
    return jwt.verify(token, 'hacktivsecret')
}

module.exports = {
    getToken,
    verifyToken
}