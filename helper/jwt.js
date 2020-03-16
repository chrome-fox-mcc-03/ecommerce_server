const jwt = require('jsonwebtoken')

function getToken(payload) {
  let token = jwt.sign(payload, process.env.SECRET)
  return token
}

function verifyToken(token) {
  return decoded = jwt.verify(token, process.env.SECRET)
}

module.exports = {
  getToken,
  verifyToken
}