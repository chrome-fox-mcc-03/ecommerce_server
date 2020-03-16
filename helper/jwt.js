const jwt = require('jsonwebtoken');

function makeToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET)
    return token    
}


module.exports = {
    makeToken
}