const { Cart, CartItem, Item, sequelize } = require('../models')

module.exports = 
  class CartController {
    static findCart (req, res, next) {
      const UserId = req.currentUserId
      Cart.findOne({
        where: { UserId },
        include: [
          {
            model: CartItem,
            order: [['id']],
            where: { isPaid: false },
            include: Item
          }
        ]
      })
      .then(cart => res.status(200).json({ cart }))
      .catch(next)
    }

    static addCart (req, res, next) {
      const CartId = req.currentCart
      const { quantity, ItemId } = req.body
      sequelize.transaction(transaction => {
        return CartItem.findOrCreate({
          where: { 
            ItemId, 
            CartId, 
            isPaid: false
          },
          defaults: {
            quantity,
            ItemId,
            CartId,
            isPaid: false
          },
          transaction
        })
        .then(response => {
          if (!response[1]) {
            return CartItem
              .increment(
                ['quantity'], 
                { 
                  by: quantity,
                  where: { CartId, ItemId }, 
                  transaction  
                }
              )
          } else {
            return response[0]
          }
        })
        .then(() => res.status(201).json({ message: 'Add Cart successful' }))
        .catch(next)
      })
    }

    static checkout (req, res, next) {
      const CartId = req.currentCart
      return sequelize.transaction(transaction => {
        return CartItem.update({
          isPaid: true
        }, {
          where: {
            CartId,
            isPaid: false
          },
          returning: true,
          transaction
        })
        .then(response => {
          if (!response[0]) {
            throw {
              status: 400,
              message: 'No item in cart'
            }
          } else {
            let promises = []
            response[1].forEach(cartItem => {
              promises.push(
                Item.decrement(['stock'], {
                  where: { id: cartItem.ItemId },
                  by: cartItem.quantity,
                  transaction
                })
              )
            })
            return Promise.all(promises)
          }
        })
        .then(() => res.status(200).json({ message: 'Checkout successful' }))
        .catch(next)
      })
    }

    static history (req, res, next) {
      const UserId = req.currentUserId
      Cart.findOne({
        where: { UserId },
        include: [
          {
            model: CartItem,
            where: { isPaid: true },
            order: [['id', 'DESC']],
            include: Item
          }
        ]
      })
      .then(cart => res.status(200).json({ cart }))
      .catch(next)
    }
  }