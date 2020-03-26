const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { sequelize, Cart, Product, CartProduct } = require('../models')

class CustomerController {
  static register(req, res, next) {
    let customer
    let payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'customer'
    }
    User.create(payload)
      .then(data => {
        customer = data
        let payload = {
          UserId : data.id
        }
        return Cart.create(payload)
      })
      .then(data => {
        res.status(201).json({
          customer : customer,
          cartId : data.id
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    let getToken
    let payload = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: payload.email
      }
    })
      .then(customer => {
        if (customer) {
          let statusLogin = checkPassword(payload.password, customer.password)
          if (statusLogin) {
            let dataCustomer = {
              id: customer.id,
              name: customer.name,
              email: customer.email,
              role: 'customer'
            }
            let token = generateToken(dataCustomer)
            getToken = token
            return Cart.findOne({
              where: {
                UserId: customer.id
              }
            })  
          } else {
            next({
              name: 'Invalid Email/Password'
            })
          }
        } else {
          next({
            name: 'Invalid Email/Password'
          })
        }
      })
      .then(cart => {
        res.status(200).json({
          access_token: getToken,
          cartId: cart.id
        })
      })
      .catch(next)
  }

  static getCartCustomer (req, res, next) {
    const id = req.currentUserId
    let cartId
    let productsCus
    User.findOne({
        where: {
            id
        },
        include: {
            model: Cart,
            where: {
              UserId : id
            }
        }
    })
      .then(customer => {
          cartId = customer.Cart.id
          return CartProduct.findAll({
            where: {
              CartId : cartId,
              isCheckout : false
            }
          })
      })
      .then( products => {
          productsCus = products
          return Product.findAll({
            order: [['id']]
          })
      })
      .then( products => {
        let data = []
        for (let i = 0; i < productsCus.length; i++) {
          for (let j = 0; j < products.length; j++) {
            if (productsCus[i].ProductId === products[j].id) {
              let raw = {
                product : {
                  id: products[j].id,
                  name: products[j].name,
                  image_url: products[j].image_url,
                  price: products[j].price,
                  stock: products[j].stock
                },
                qty: productsCus[i].quantity,
                isCheckout: productsCus[i].isCheckout
              }
              data.push(raw)
            }
          }
        }
        res.status(200).json({
          cartId : cartId,
          products : data
        })
      })
      .catch(next)
  }

  static addNewProductToCart (req, res, next) {
    let productId = req.params.productId
    let cartId = req.body.cartId
    let quantity = req.body.quantity
    let payload = {
      CartId : cartId,
      ProductId : productId,
      quantity : quantity,
      isCheckout : false
    }
    CartProduct.create(payload)
      .then( data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static updateQuantity (req, res, next) {
    let productId = req.params.productId
    let cartId = +req.body.cartId
    let quantity = +req.body.quantity
    let payload = {
      CartId : cartId,
      ProductId : productId,
      quantity : quantity,
      isCheckout : false
    }
    CartProduct.update(payload, {
      where: {
        ProductId: productId,
        CartId: cartId
      },
      returning : true
    })
      .then( data => {
        res.status(200).json(data[1][0])
      })
      .catch(next)
  }

  static deleteItem (req, res, next) {
    let productId = req.params.productId
    CartProduct.destroy({
      where : {
        ProductId : productId,
        CartId: req.body.cartId
      }
    })
      .then( data => {
        res.status(200).json({
          msg: 'Delete Success'
        })
      })
      .catch(next)
  }

  static checkout(req, res, next) {
    const cartId = req.body.cartId
    const cart = req.body.cart;
    const UserId = req.currentUserId;
    sequelize.transaction(t => {
      const promises = [];
      cart.forEach(el => {
        const newPromise = Product.findOne({
          where: { id: el.product.id },
          transaction: t
        });
        promises.push(newPromise);
      });
      return Promise.all(promises).then(products => {
        const updatePromises = [];
        products.forEach((el, index) => {
          const data = {
            name: el.name,
            image_url: el.image_url,
            price: el.price,
            stock: el.stock - cart[index].qty,
            description: el.description,
            CategoryId: el.CategoryId,
          };
          const newPromise = Product.update(data, {
            where: { id: el.id },
            transaction: t
          });
          updatePromises.push(newPromise);
        });

        return Promise.all(updatePromises).then(products => {
          const cartPromises = [];
          cart.forEach(el => {
            const data = {
              CartId: cartId,
              ProductId: el.product.id,
              isCheckout: true,
              quantity: el.qty
            };
            const newPromise = CartProduct.update(data, {
              where: { 
                ProductId: data.ProductId,
                CartId: data.CartId,
                isCheckout: false
              },
              transaction: t
            });
            cartPromises.push(newPromise);
          });
          return Promise.all(cartPromises);
        });
      });
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
  }  
}

module.exports = CustomerController