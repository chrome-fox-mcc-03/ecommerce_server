const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

function createToken(payload) {
    return jwt.sign(payload, SECRET);
}

function verify(token) {
    return jwt.verify(token, SECRET);
}

module.exports = {
    createToken,
    verify
};
