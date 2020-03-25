const { Cart, User, CartProduct } = require('../models')

class CartController {
  static findAll(req, res, next) {
    Cart.findAll({
      where: {
        UserId: req.decoded.id
      },
      include: [User, CartProduct]
    })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static update(req, res, next) {
    Cart.update({
      isPaid: true
    }, {
      where: {
        id: req.decoded.CartId
      }
    })
      .then(_ => {
        res.status(200).json('Paid')
      })
      .catch(next)
  }
}

module.exports = CartController