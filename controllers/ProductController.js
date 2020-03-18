const { Product } = require('../models/index');

class ProductController {

  static findAll(req, res, next) {
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

  static create(req, res, next) {
    let id = +req.decoded.id
    const payload = {
      name: req.body.name,
      description: req.body.description,
      stock: req.body.stock,
      price: req.body.price,
      image_url: req.body.image_url,
      UserId: id
    }
    Product.create(payload)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
}

module.exports = ProductController