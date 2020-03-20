const { Product } = require('../models')

class ProductController {
  static create(req, res, next) {
    Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image
    })
      .then((product) => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static display(req, res, next) {
    Product.findAll()
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    let id = req.params.id
    Product.findByPk(id)
      .then((product) => {
        if (!product) {
          res.status(404).json({ name: 'Product not Found' })
        } else {
          res.status(200).json(product)
        }
      })
      .catch(next)
  }

  static edit(req, res, next) {
    Product.update({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image
    }, {
      where: {
        id: req.params.id
      },
      returning: true
    })
      .then((newProduct) => {
        if (!newProduct[1]) {
          res.status(404).json({ name: 'Product not Found' })
        } else {
          res.status(200).json(newProduct[1][0])
        }
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Product.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((product) => {
      if(!product) {
        res.status(404).jason({ name:'Product not Found'})
      }
      else{
        res.status(200).json({ message: 'Delete success'})
      }
    })
    .catch(next)
  }
}

module.exports = ProductController