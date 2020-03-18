const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { checkPassword } = require("../helpers/bcrypt");

class UserController {
  static register(req, res, next) {
    let { email, password, username } = req.body;
    User.create({
      email,
      password,
      username
    })
      .then(created => {
        res.status(201).json({
          status: "Created",
          msg: "Successfully created a new User",
          data: {
            id: created.id,
            email: created.email,
            username: created.username
          }
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    let { email, password } = req.body;
    User.findOne({
      where: {
        email
      }
    })
      .then(searched => {
        if (searched) {
          if (checkPassword(password, searched.password)) {
            let payload = {
              email: searched.email,
              username: searched.username
            };
            res.status(200).json({
              status: "OK",
              msg: "Successfully logged in",
              data: {
                token: generateToken(payload)
              }
            });
          } else {
            next({
              status: "Bad Request",
              msg: "Email / Password was wrong, please try again"
            });
          }
        }
      })
      .catch(next);
  }
}

module.exports = UserController;
