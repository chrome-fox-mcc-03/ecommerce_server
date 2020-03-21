const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
class HelperJwt {
  static sign(payload) {
    const token = jwt.sign({payload},secret)
    return token
  }
  static decode (token) {
    const payload = jwt.verify(token,secret)
    return payload
  } 
}

module.exports = HelperJwt