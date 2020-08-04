const { User } = require('../models')
const Bcrypt = require('../helpers/bcrypt')
const JWT = require('../helpers/jwt')
// const { OAuth2Client } = require('google-auth-library')
// const client = new OAuth2Client()

module.exports = class Controller {
  static register(req, res, next) {
    User.create({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    })
      .then(data => {
        res.status(201).json({email: data.email, role: data.role})
      })
      .catch(err => next(err))
  }

  static login(req, res, next) {
    // console.log(req.body)
    User.findOne({where: {email: req.body.email}})
      .then(data => { //console.log(req.body.password, data.password)
        if (data) {
          if (Bcrypt.comparing(req.body.password, data.password)) {
            const payload = {email: data.email, id: data.id}
            const token = JWT.sign(payload)
            res.status(200).json({token})
          } else {
            next({name: "Wrong password", message: "Password email is wrong!"})
          }
        } else {
          next({name: "Wrong password", message: "Password email is wrong!"})
        }
      })
      .catch(err => next(err))
  }
}