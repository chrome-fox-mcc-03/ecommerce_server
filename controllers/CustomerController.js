const { sequelize, Customer, Product, User, Cart, CartProducts } = require('../models')
const { Sequelize } = sequelize
const { getToken, getPayload } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcrypt')
const appPayload = require('../helpers/appPayload')
const appError = require('../helpers/appError')
const { gt } = Sequelize.Op;
class CustomerController {
  static register(req, res, next) {
    let payload = {}
    const { email, password, name, avaurl } = req.body;
    Customer.create({
      email,
      password,
      name,
      avaurl
    })
      .then(result => {
        payload = {
          email: result.email,
          id: result.id,
          name: result.name,
          avaurl: result.avaurl
        }
        payload.token = getToken(appPayload(result))
        return Cart.create({
          CustomerId: payload.id
        })
      })
      .then(_ => {
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
    // res.status(200).json('shop')
    // /shop/?page=1&size=20
    let page = 1
    let size = 20
    if (Number(req.query.page)) {
      page = req.query.page
    }
    if (Number(req.query.size)) {
      size = req.query.size
    }
    let offset = (page - 1) * size
    Product
      .findAll({
        where: {
          stock: {[gt]: 0}
        },
        limit: size,
        offset: offset,
        include: [ User ]
      })
      .then(result => {
        let products = []
        result.forEach(item => {
          let product = {
            id: item.id,
            name: item.name,
            price: item.price,
            stock: item.stock,
            image_url: item.image_url,
            seller: item.User.email.split('@')[0]
          }
          products.push(product)
        })
        res.status(200).json({
          products
        })
      })
      .catch(next)
  }
  static cart(req, res, next) {
    // res.status(200).json('cart')
    const token = req.headers.token
    const { id } = getPayload(token)
    Cart.findOne({
      where: {
        CustomerId: id
      }
    })
      .then(result => {
        const CartId = result.dataValues.id
        return CartProducts.findAll({
          where: {
            CartId,
            quantity: {[gt]: 0}
          },
          include: [
            { 
              model: Product,
              include: [ User ]
            }
          ]
        })
      })
      .then(result => {
        console.log(result)
        let cartItems = []
        result.forEach(item => {
          let cartItem = {
            name: item.Product.name,
            quantity: item.quantity,
            seller: item.Product.User.email.split('@')[0],
            stock: item.Product.stock,
            price: item.Product.price
          }
          cartItems.push(cartItem)
        })
        res.status(200).json({
          cartItems
        })
      })
      .catch(err => {
        // console.log(err)
        next(err)
      })
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
