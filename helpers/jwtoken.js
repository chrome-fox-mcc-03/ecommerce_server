const jwt = require('jsonwebtoken')


function signToken(payload){
    const secret = process.env.SECRET
    const access_token = jwt.sign(payload, secret)
    return access_token
}

module.exports = {
    signToken
}