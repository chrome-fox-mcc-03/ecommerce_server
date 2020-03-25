const {
  CartProduct,
  Cart,
  Product
} = require('../models')
const email = require('../helpers/email')
class CartProductController {
  static findAll(req, res, next) {
    CartProduct.findAll({
        include: [Product, {
          model: Cart,
          where: {
            UserId: req.decoded.id
          }
        }]
      })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static findCart(req, res, next) {
    CartProduct.findAll({
        where: {
          CartId: req.decoded.CartId
        },
        include: [Product, Cart]
      })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }
  static create(req, res, next) {
    CartProduct.create({
        quantity: req.body.quantity,
        CartId: req.decoded.CartId,
        ProductId: req.params.id
      })
      .then(response => {
        res.status(201).json(response)
      })
      .catch(next)
  }

  static decrement(req, res, next) {
    CartProduct.decrement('quantity', {
        by: 1,
        where: {
          CartId: req.decoded.CartId,
          ProductId: +req.params.id
        }
      })
      .then(response => {
        let msg = 'Product Decreased'
        res.status(200).json(msg)
      })
      .catch(err => {
        console.log(err);
      })
  }

  static increment(req, res, next) {
    CartProduct.increment('quantity', {
        by: 1,
        where: {
          CartId: req.decoded.CartId,
          ProductId: +req.params.id
        }
      })
      .then(response => {
        let msg = 'Product Decreased'
        res.status(200).json(msg)
      })
      .catch(err => {
        console.log(err);
      })
  }

  static checkout(req, res, next) {
    CartProduct.findAll()
      .then(response => {
        response.map(el => {
          Product.decrement('stock', {
            by: el.quantity,
            where: {
              id: el.ProductId
            }
          })
        })
      })
      .then(_ => {
        return CartProduct.destroy({
          where: {
            CartId: req.decoded.CartId
          }
        })
      })
      .then(_ => {
        const body = {
          form: '"hacktiv8 shop" <hacktiv8shop@gmail.com',
          to: req.decoded.email,
          subject: 'Confirmation Code',
          text: `Code: ${req.body.number}`
        }
        email.sendMail(body, (error, info) => {
            if(error) console.log(error);
            else console.log(info);
        })
        res.status(200).json('Checked Out')
      })
      .catch(next)
  }
  static deleteCart(req, res, next) {
    const {
      id
    } = req.params
    CartProduct.destroy({
        where: {
          ProductId: id
        }
      })
      .then(response => {
        let msg = 'Product Removed from Cart'
        res.status(200).json(msg)
      })
      .catch(next)
  }
}

module.exports = CartProductController