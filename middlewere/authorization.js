const { Cart } = require('../models')

function userAuthorization(req, res, next) {
  Cart.findOne({
    where: {
      id: req.params.cartId,
      UserId: req.currentUserid
    }
  })
  .then((cart) => {
    if(cart) {
      next()
    } else {
      res.status(401).json({ message: `Not authorized`})
    }
  })
  .catch((err) => {
    res.status(401).json({ message: `Not authorized`})
  })
}

function adminAuthorization(req, res, next) {
  Cart.findOne({
    where: {
      id: req.params.id
    }
  })
  .then((cart) => {
    if(cart) {
      next()
    } else {
      res.status(401).json({ message: `Not authorized`})
    }
  })
  .catch((err) => {
    res.status(401).json({ message: `Not authorized`})
  })
}

module.exports = {
  userAuthorization,
  adminAuthorization
}