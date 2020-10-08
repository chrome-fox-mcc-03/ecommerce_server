const { User, Cart, sequelize } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

module.exports = 
  class UserController {
    static login (req, res, next) {
      const { email, password } = req.body
      User.findOne({
        where: { email }
      })
        .then(user => {
          if (!user) {
            next({
              status: 400,
              message: 'Wrong email / password'
            })
          } else {
            if (!compare(password, user.password)) {
              next({
                status: 400,
                message: 'Wrong email / password'
              })
            } else {
              const token = sign(user.id)
              res.status(200).json({ 
                token, 
                username: user.username 
              })
            }
          }
        })
        .catch(next)
    }

    static loginAdmin (req, res, next) {
      const { email, password } = req.body
      User.findOne({
        where: { email }
      })
        .then(user => {
          if (!user) {
            next({
              status: 400,
              message: 'Wrong email / password'
            })
          } else {
            if (!user.role) {
              next({
                status: 401,
                message: 'Unauthorized access'
              })
            } else {
              if (!compare(password, user.password)) {
                next({
                  status: 400,
                  message: 'Wrong email / password'
                })
              } else {
                const token = sign(user.id)
                res.status(200).json({ 
                  token, 
                  username: user.username 
                })
              }
            }
            }
        })
        .catch(next)
    }

    static register (req, res, next) {
      const { username, email, password } = req.body
      console.log(username, email, password   )
      return sequelize.transaction(transaction => {
        return User
          .create(
            { username, email, password },
            { transaction }  
          )
          .then(user => {
            return Cart
              .create(
                { UserId: user.id },
                { transaction }
              )
          })
          .then(() =>res.status(201).json({ message: 'Register successful' }))
          .catch(next)
      })
    }
  }