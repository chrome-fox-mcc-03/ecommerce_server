const { Product } = require('../models')

class ProductController {
  static findAll (req, res, next) {
    Product.findAll()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static create (req, res, next) {
    let payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock
    }
    Product.create(payload)
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static findOne (req, res, next) {
    let id = req.params.id
    Product.findByPk(id)
      .then(product => {
        if (product) {
          res.status(200).json(product)
        } else {
          next({
            name: 'Not Found'
          })
        }
      })
      .catch(next)
  }

  static update (req, res, next) {
    let id = req.params.id
    let payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock
    }
    Product.update(payload, {
      where: {
        id
      },
      returning: true
    })
      .then(data => {
        if (data[1][0]) {
          res.status(200).json(data[1][0])
        } else {
          next({
            name: 'Not found'
          })
        }
      })
      .catch(next)
  }

  static delete (req, res, next) {
    let id = req.params.id
    Product.destroy({
      where: {
        id
      }
    })
      .then(data => {
        res.status(200).json({
          message: 'Delete is successfully'
        })
      })
      .catch(next)
  }
}

module.exports = ProductController