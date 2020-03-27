const { Cart, Product, sequelize } = require('../models')

class CartController {
  static add(req, res, next) {
    Cart.findOne({
      where: {
        ProductId: req.body.ProductId,
        UserId: req.currentUserid
      }
    })
      .then((result) => {
        if (result) {
          return Cart.update({
            quantity: sequelize.literal('quantity + 1')
          }, {
            where: {
              ProductId: req.body.ProductId,
              UserId: req.currentUserid
            },
            returning: true
          })
            .then((updatedCart) => {
              res.status(200).json(updatedCart[1][0])
            })
        }
        else {
          return Cart.create({
            quantity: 1,
            UserId: req.currentUserid,
            ProductId: req.body.ProductId
          })
            .then((cart) => {
              res.status(201).json(cart)
            })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static display(req, res, next) {
    
    Cart.findAll({
      where: {
        UserId: req.currentUserid
      },
      order: [['createdAt', 'ASC']],
      include: [Product]
    })
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

  static increase(req, res, next) {
    Cart.update({
      quantity: sequelize.literal('quantity + 1')
    }, {
      where: {
        id: req.params.cartId
      },
      returning: true
    })
    .then((cart) => {
      res.status(200).json(cart[1][0])
    })
    .catch(next)
  }

  static decrease(req, res, next) {
    Cart.update({
      quantity: sequelize.literal('quantity - 1')
    }, {
      where: {
        id: req.params.cartId
      },
      returning: true
    })
    .then((cart) => {
      res.status(200).json(cart[1][0])
    })
    .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.cartId
    let deletedCart;
    Cart.findByPk(id)
    .then((cart) => {
      if(cart) {
        deletedCart = cart
        Cart.destroy({
          where: {
            id: id
          }
        })
        .then(_ => {
          res.status(200).json(deletedCart)
        })
        .catch(next)
      }
      else {
        next({ name: 'Card not found'})
      }
    })
    .catch(next)
  }

}

module.exports = CartController