const jsonwebtoken = require('jsonwebtoken')

module.exports = class JWT{
  static sign(payload) {
    return jsonwebtoken.sign(payload, process.env.PRIVATE_KEY)
  }

  static verify(token) {
    return jsonwebtoken.verify(token, process.env.PRIVATE_KEY)
  }
}