var jwt = require('jsonwebtoken');

function generateToken(data) {
    return jwt.sign(data, process.env.SECRET);
}

function validateToken(token) {
    return jwt.verify(token, process.env.SECRET);
}

module.exports = { generateToken, validateToken };