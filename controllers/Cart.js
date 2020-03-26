const { Cart, Product } = require('../models/index')

class Controller {
  static findAll (req, res, next) {
    const { id } = req.user
    Cart.findAll({
      where: {
        UserId: id
      }
    })
      .then(carts => {
        res.status(200).json(carts)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static create (req, res, next) {
    const { quantity, ProductId } = req.body
    const UserId = req.user.id
    let data
    Cart.findOne({
      where: {
        UserId,
        ProductId
      }
    })
      .then(cart => {
        if (cart) {
          return Cart.increment('quantity', {
            by: quantity,
            where: {
              id: cart.id
            },
            returning: true
          })
        } else {
          return Cart.create({ quantity, UserId, ProductId }, {
            include: ['Product', 'User']
          })
        }
      })
      .then(cart => {
        if(cart.length > 1) {
          data = cart[0][0][0]
          return Product.decrement('stock', {
            by: quantity,
            where: {
              id: data.ProductId
            }
          })
        } else {
          data = cart
          return Product.decrement('stock', {
            by: data.quantity,
            where: {
              id: data.ProductId
            }
          })
        }
      })
      .then(_ => {
        return Cart.findOne({
          where: {
            id: data.id
          },
          include: ['Product']
        })
      })
      .then(cart => {
        data = cart
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static update (req, res, next) {
    const { quantity, ProductId } = req.body
    const idUpdate = req.params.id
    let plus
    let updateCart
    Cart.findOne({
      where: {
        id: idUpdate
      }
    })
      .then(data => {
        plus = data.quantity - quantity
        return Cart.update({ quantity }, {
          where: {
            id: idUpdate
          },
          returning: true,
          include: ['Product']
        })
      })
      .then(cart => {
        updateCart = cart[1][0]
        return Product.increment('stock', {
          where: {
            id: updateCart.ProductId
          },
          by: plus
        })
      })
      .then(_ => {
        return Cart.findOne({
          where: {
            id: updateCart.id
          },
          include: ['Product']
        })
      })
      .then(cart => {
        updateCart = cart
        res.status(200).json(updateCart)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static deleted (req, res, next) {
    const { id } = req.params
    let deletedCart
    Cart.findOne({
      where: {
        id
      },
      include: ['Product']
    })
      .then(cart => {
        deletedCart = cart
        return Cart.destroy({
          where: {
            id
          }
        })
      })
      .then(_ => {
        Product.increment('stock', {
          by: deletedCart.quantity,
          where: {
            id: deletedCart.ProductId
          }
        })
      })
      .then(_ => {
        res.status(200).json(deletedCart)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
}

module.exports = Controller