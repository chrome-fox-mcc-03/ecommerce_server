const { verify } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = {
  authAdmin (req, res, next) {
    const { token } = req.headers
    const decoded = verify(token)
    const id = decoded.id
    User.findByPk(id)
      .then(user => {
        if (!user) {
          throw {
            status: 401,
            message: 'Please login properly'
          }
        } else {
          if (!user.role) {
            throw {
              status: 401,
              message: 'Please login properly'
            }
          } else {
            next()
          }
        }
      })
      .catch(next)
  }
}