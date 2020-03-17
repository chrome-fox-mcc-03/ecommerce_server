const jwt = require('jsonwebtoken')

module.exports = {
  generateToken : function(payload) {
    let token = jwt.sign(payload, process.env.SECRET);
    return token
  },
  verifyToken : function(token) {
    return jwt.verify(token, process.env.SECRET)
  }
}