const { verify } = require('../helpers/jwt')
const { User, Cart } = require('../models')

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
  },

  authClient (req, res, next) {
    const { token } = req.headers
    const decoded = verify(token)
    const id = decoded.id
    const authError = {
      status: 401,
      message: 'Please login properly'
    }

    User.findByPk(id, {
      include: Cart
    })
      .then(user => {
        if (!user) throw authError
        else {
          req.currentUserId = user.id
          req.currentCart = user.Cart.id
          next()
        }
      })
      .catch(next)
  }
}