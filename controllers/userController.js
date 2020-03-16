const { User } = require('../models')


class userController {

  static Create(req, res, next) {
    User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then((user) => {
        res.status(201).json({user})
      })
      .catch((err) => {
        next(err)
      })
  }

  static Login(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
  }

}

module.exports = userController