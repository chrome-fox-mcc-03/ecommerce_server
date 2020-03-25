const { Cart } = require('../models')

function authorization(req, res, next) {
  Cart.findOne({
    where: {
      id: req.params.id,
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

module.exports = authorization