const { User } = require('../models/index');

module.exports = (req, res, next) => {
  const isAdmin = req.decoded.isAdmin
  const id = +req.decoded.id

  User.findOne({
    where: { id }
  })
    .then(response => {
      if(response) {
        if(response.isAdmin) {
          next()
          return null
        }
        else {
          next({
            status: 403,
            msg: "You're not authorized to perform this action!"
          })
        }
      }
      else {
        next({
          status: 403,
          msg: "You're not authorized to perform this action!"
        })
      }
    })
    .catch(err => {
      next({
        status: 401,
        msg: "Authentication failed! Please re-login"
      })
    })
}