const { User } = require('../models')
const { verifyToken } = require('../helpers')

module.exports = {
  isLogin(req, res, next) {
    const { token } = req.headers

    try {
      const { id, email } = verifyToken(token)

      User.findOne({
        where: { id, email }
      })
        .then(data => {
          if (data) {
            req.decoded = data
            next()
          } else {
            next({
              status: 404,
              message: 'user not found'
            })
          }
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  }
}