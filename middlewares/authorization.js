const { User } = require('../models')

module.exports = {
  adminAuthorization : function (req, res, next) {
    User.findOne({
      where : {
        id: req.currentUserId
      }
    })
      .then(user => {
        if (!user) {
          next({
            name: 'Not Authorization'
          })
        } else {
          if (user.role === 'admin') {
            next()
          } else {
            next({
              name: 'Not Authorization'
            })
          }
        }
      })
  },
  customerAuthorization : function (req, res, next) {
    User.findOne({
      where: {
        id: req.currentUserId
      }
    })
      .then(user => {
        if (!user) {
          next({
            name: 'Not Authorization'
          })
        } else {
          next()
        }
      })
  }
}