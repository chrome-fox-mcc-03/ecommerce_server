const { Product } = require('../models/index');

class ProductController {

  static findAll(req, res, next) {
    console.log(req.decoded);
    Product.findAll()
      .then(response => {
        res.status(200).json({ response })
      })
      .catch(err => {
        next(err
          )
      })
  }

  static findOne(req, res, next) {
    const id = +req.params.id
    Product.findOne({
      where: { id }
    })
    .then(response => {
      res.status(200).json({ response })
    })
    .catch(err => {
      next(err
        )
    })
  }
}

module.exports = ProductController