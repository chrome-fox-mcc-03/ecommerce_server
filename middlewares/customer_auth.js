const { Customer } = require('../models')
const { getPayload } = require('../helpers/jwt')
const appError = require('../helpers/appError')

module.exports = function(req, res, next) {
  const token = req.headers.token
  if (token) {
    const payload = getPayload(token)
    if (payload) {
      Customer
        .findOne({
          where: {
            email: payload.email,
            id: payload.id
          }
        })
        .then(result => {
          if (result) {
            next()
          } else {
            next(appError(400, 'invalid token'))
          }
        })
        .catch(next)
    } else {
      next(appError(400, 'invalid token'))
    }
  } else {
    next(appError(400, 'token not found'))
  }
}