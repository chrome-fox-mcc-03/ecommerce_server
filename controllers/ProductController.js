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
      return null
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
        res.status(201).json(response.dataValues)
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req, res, next) {
    let id = +req.params.id
    const payload = {
      name: req.body.name,
      description: req.body.description,
      stock: req.body.stock,
      price: req.body.price,
      image_url: req.body.image_url,
    }
    Product.update(payload, {
      where: { id }
    })
      .then(response => {
        res.status(200).json(payload.name)
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let id = +req.params.id
    Product.destroy({
      where: { id }
    })
      .then(response => {
        if(response) res.status(200).json(response)
        else next({
          status: 400,
          message: "Product not found!"
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController