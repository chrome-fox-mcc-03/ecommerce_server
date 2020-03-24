const { Customer } = require('../models')
const { getToken } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcrypt')
const appPayload = require('../helpers/appPayload')
const appError = require('../helpers/appError')

class CustomerController {
  static register(req, res, next) {
    const { email, password, name, avaurl } = req.body;
    Customer.create({
      email,
      password,
      name,
      avaurl
    })
      .then(result => {
        let payload = {
          email: result.email,
          id: result.id,
          name: result.name,
          avaurl: result.avaurl
        }
        payload.token = getToken(appPayload(result))
        res.status(201).json({
          user: payload
        })
      })
      .catch(next)
  }
  static login(req, res, next) {
    const { email, password } = req.body;
    Customer.findOne({
      where: {
        email
      }
    })
      .then(result => {
        if (result) {
          if (compareHash(password, result.password)) {
            let payload = {
              email: result.email,
              id: result.id,
              name: result.name,
              avaurl: result.avaurl
            }
            payload.token = getToken(appPayload(result))
            res.status(200).json({
              user: payload
            })
          } else {
            next(appError(404, 'wrong email/password'))
          }
        } else {
          next(appError(404, 'wrong email/password'))
        }
      })
      .catch(next)
  }
  static shop(req, res, next) {
    res.status(200).json('shop')
  }
  static cart(req, res, next) {
    res.status(200).json('cart')
  }
  static appendToCart(req, res, next) {
    res.status(200).json('append item to cart')
  }
  static removeFromCart(req, res, next) {
    res.status(200).json('remove item from cart')
  }
  static status(req, res, next) {
    res.status(200).json({
      message: 'cutomer database online'
    })
  }
}

module.exports = CustomerController