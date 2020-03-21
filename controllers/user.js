const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register (req, res, next) {
    let payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }
    User.create(payload)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(next)
  }

  static login (req, res, next) {
    let payload = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where : {
        email: payload.email
      }
    })
      .then(user => {
        if (!user) {
          next({
            name: 'Invalid Email/Password'
          })
        } else {
          let status = checkPassword(payload.password, user.password)
          if (!status) {
            next({
              name: 'Invalid Email/Password'
            })
          } else {
            let payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.password
            }
            let token = generateToken(payload)
            res.status(200).json({
              access_token: token,
              name: payload.name
            })
          }
        }
      })
      .catch(next)
  }
}

module.exports = UserController