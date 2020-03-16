const jwt = require('jsonwebtoken');

function makeToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET)
    return token    
}

function verify(token) {
    return jwt.verify(token, process.env.SECRET);
}

module.exports = {
    makeToken,
    verify
}