const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const salt = bcrypt.genSaltSync(+process.env.SALT)
const secret = process.env.SECRET

module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, salt)
  },
  checkPassword(password, dbPassword) {
    return bcrypt.compareSync(password, dbPassword)
  },
  createToken(payload) {
    return jwt.sign(payload, secret)
  },
  verifyToken(token) {
    return jwt.verify(token, secret)
  }
}