const { Product } = require('../models')

class ProductController {
  static findAll(req, res, next) {
    Product.findAll({
        order: [['id', 'ASC']]
    })
      .then(result => {
        let products = result.map(el => {
          return {
            id: el.id,
            name: el.name,
            image_url: el.image_url,
            price: el.price,
            stock: el.stock,
          }
        })
        res.status(200).json({
            products
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static create(req, res, next) {
    let { name, image_url, price, stock } = req.body
    Product.create({ 
        name, image_url, price, stock 
    })
      .then(result => {
        let data = {
          name: result.name,
          image_url: result.image_url,
          price: result.price,
          stock: result.stock
        }
        res.status(201).json({
          data,
          message: 'success insert new product'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req, res, next) {
    let message = 'success update product'
    let id = req.params.id
    let { name, image_url, price, stock } = req.body
    Product.update({ 
        name, image_url, price, stock 
    }, { 
        where: { 
            id 
        } 
    })
      .then(result => {
        if (!result[0]) { 
            message = 'failed update product' 
        }
        let data = {
          name,
          image_url,
          price,
          stock
        }
        res.status(201).json({
          status: result,
          data,
          message
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let id = +req.params.id
    let message = 'success delete product'
    Product.destroy({ 
        where: { 
            id 
        } 
    })
      .then(result => {
        if (!result) {
          message = 'failed to delete product'
        }
        res.status(200).json({
          status: result,
          message
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static findOne(req, res, next) {
    let id = +req.params.id
    Product.findOne({ 
        where: { 
            id 
        } 
    })
      .then(result => {
        let product = {
          name: result.name,
          image_url: result.image_url,
          price: result.price,
          stock: result.stock,
        }
        res.status(200).json({ 
            product 
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController