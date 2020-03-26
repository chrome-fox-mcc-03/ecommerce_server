const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
  if (!req.headers.access_token) {
    next({
      name: 'Please Login First'
    })
  } else {
    try {
      let decoded = verifyToken(req.headers.access_token)
      User.findOne({
        where : {
          email: decoded.email
        }
      })
        .then(user => {
          if (!user) {
            next({
              name: 'Invalid Token Error'
            })
          } else {
            req.currentUserId = decoded.id
            req.currentEmail = decoded.email
            req.currentName = decoded.name
            req.currentRole = decoded.role
            next()
          }
        })
        .catch(next)
    } catch (err) {
      next({
        name: 'Invalid Token Error'
      })
    }
  }
}