const jwt = require('jsonwebtoken');

function getToken(payload) {
    let token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

function getPayload(token) {
    try {
        let payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    }
    catch {
        return null
    }
}

module.exports = {
    getToken,
    getPayload,
}