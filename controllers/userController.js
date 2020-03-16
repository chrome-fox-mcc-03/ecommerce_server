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
        res.status(500).json(err)
      })
  }

}

module.exports = userController