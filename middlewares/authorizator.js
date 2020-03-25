const { User, CartProducts, Cart, Customer } = require('../models')
const { getPayload } = require('../helpers/jwt');
const appPayload = require('../helpers/appPayload');
const appError = require('../helpers/appError');

function adminAuthorizator (req, res, next) {
  const access_token = req.headers.access_token;
  let payload = appPayload(getPayload(access_token));
  User.findOne({
      where: payload,
  })
    .then(result => {
      if (result) {
        next()
      } else {
        next(appError(403, "user not authorized"))
      }
    })
    .catch(next)
}

function customerAuthorizator(req, res, next) {
  // authorize cartproduct with token
  const token = req.headers.token;
  const customer = getPayload(token);
  const cartProductId = Number(req.params.id);
  if (cartProductId) {
    CartProducts.findOne({
      where: {
        id: cartProductId
      },
      include: [
        {
          model: Cart,
          include: [
            {
              model: Customer
            }
          ]
        }
      ]
    })
      .then(result => {
        if (result) {
          const CustomerId = result.Cart.Customer.id;
          if (CustomerId === customer.id) {
            next()
          } else {
            throw appError(401, 'not authorized for cart item id')
          }
        } else {
          throw appError(404, 'cart item id not found')
        }
      })
      .catch(err => {
        next(err)
      })
  } else {
    next(appError(400, 'cart item id required'))
  }
  // next()
}

module.exports = {
  adminAuthorizator,
  customerAuthorizator
}