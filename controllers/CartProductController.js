const { CartProduct, Product } = require('../models/index')
const { Op, QueryInterface } = require('sequelize')

class CartProductController {

  static findPerUser(req, res, next) {
    const id = +req.decoded.id

    CartProduct.findAll({
        where: {
          CartId: id
        },
        attributes: {
          include: ['id']
        },
        include: ['Product']
      })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        next(err)
      })
  }

  static addToCart(req, res, next) {

    const ProductId = +req.params.id
    const CartId = +req.decoded.id
    const {
      quantity
    } = req.body
    let addedItem = {}

    CartProduct.findOne({
        where: {
          CartId,
          ProductId,
          isPaid: false
        }
      })
      .then(response => {
        if (response) {
          addedItem.quantity = response.quantity
          Product.findOne({
              where: {
                id: ProductId
              }
            })
            .then(response => {
              const total = Number(quantity) + addedItem.quantity
              if (response.stock >= total) {
                CartProduct.update({
                    quantity: total
                  }, {
                    where: {
                      CartId,
                      ProductId
                    }
                  })
                  .then(response => {
                    res.status(200).json('Added item(s) to cart')
                  })
                  .catch(err => {
                    next(err)
                  })
              } else {
                return Promise.reject({
                  status: 400,
                  msg: "Sorry! You can't buy more than the available stock"
                })
              }
            })
            .catch(err => {
              next(err)
            })
        } else {
          Product.findOne({
              where: {
                id: ProductId
              }
            })
            .then(response => {
              addedItem.price = response.price

              if (response.stock >= quantity) {
                addedItem.name = response.name
                return CartProduct.create({
                  ProductId,
                  quantity,
                  CartId
                })
              } else {
                return Promise.reject({
                  status: 400,
                  msg: "Sorry! You can't buy more than the available stock"
                })
              }
            })
            .then(response => {
              addedItem.invoice = response.quantity * addedItem.price
              res.status(201).json({
                addedItem
              })
            })
            .catch(err => {
              next(err)
            })
        }
      })
      .catch(err => {

      })
  }

  static delete(req, res, next) {
    const CartId = +req.params.id

    CartProduct.destroy({
        where: {
          id: CartId
        }
      })
      .then(response => {
        if (response) res.status(200).json({
          msg: "Item(s) removed from cart"
        })
        else next({
          status: 404,
          msg: "Product not found"
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static pay(req, res, next) {
    const CartId = +req.params.id
    const product = {};
    CartProduct.findOne({
        where: {
          id: CartId
        }
      })
      .then(response => {
        product.id = response.ProductId
        product.quantity = response.quantity
        if (response) {
          if (!response.isPaid) {
            return CartProduct.update({
              isPaid: true
            }, {
              where: {
                id: CartId
              }
            })
          } else {
            return Promise.reject({
              status: 400,
              msg: "You already pay this product"
            })
          }
        } else {
          return Promise.reject({
            status: 404,
            msg: "Product not found"
          })
        }
      })
      .then(_ => {
        return Product.decrement('stock', { by: product.quantity, where: { id: product.id }})
      })
      .then(_ => {
        res.status(200).json({
          msg: "Thank you for purchasing our product!"
        })
      })
      .catch(err => {
        next(err)
      })
  }

  // static payall(req, res, next) {
  //   let { listId } = req.body
  //   listId = listId.split(',')
  //   CartProduct.update({
  //     isPaid: true}, { where: { id: listId }, returning: true })
  //     .then(response => {
  //       res.status(200).json({
  //         msg: 'Paid all item in cart'
  //       })
  //     })
  //     .catch(err => {
  //       next(err)
  //     })
  // }

  static payall(req, res, next) {
    let listId = req.body.listId.split(',')
    console.log(listId)
    CartProduct.findAll({
      where: { id: listId },
      attributes: { include: ['id'] }
    })
    
    .then(response => {
      response.map(el => {
        Product.decrement('stock', {
          by: el.quantity,
          where : {
            id: el.ProductId
          }
        })
      })
    })
    
    .then(_ => { return CartProduct.update({ isPaid: true }, { where: { id: listId }, returning: true })})
    
    .then(response => {
      res.status(200).json('All items paid')
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }


}

module.exports = CartProductController