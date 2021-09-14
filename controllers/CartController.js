const { Cart } = require('../models/index')

class CartController {

  static findAll(req, res, next) {
    const id = +req.decoded.id
    Cart.findOne({
      where: { id },
      include: ['User']
    })
      .then(response => {
        console.log('masuk cart controller');
        res.status(200).json(response)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CartController