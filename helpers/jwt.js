const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports = {
  sign (id) {
    return jwt.sign({ id }, SECRET)
  },
  
  verify (token) {
    try {
      const decoded = jwt.verify(token, SECRET)
      return decoded
    } catch (err) {
      throw err
    }
  }
}