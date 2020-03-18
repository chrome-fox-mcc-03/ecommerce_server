const { Product } = require('../models')

module.exports = class Controller{
  static create(req, res, next) {
    Product.create({
      name: req.body.name,
      img_url: req.body.img_url,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category
    })
      .then(data => {
        res.status(201).json(data)
      })
      .err(err => next(err))
  }

  static findAll(req, res, next) {
    Product.findAll({order: [['id', 'ASC']]})
      .then(data => {
        let result = []
        data.forEach(el => result.push({
          name: el.name,
          img_url: el.img_url,
          price: el.price,
          stock: el.stock,
          category: el.category
        }))
        res.status(200).json(result)
      })
      .catch(err => next(err))
  }

  static findOne(req, res, next) {
    Product.findOne({where: {id: req.params.id}})
      .then(data => {
        res.status(200).json({
          name: data.name,
          img_url: data.img_url,
          price: data.price,
          stock: data.stock,
          category: data.category
        })
      })
      .catch(err => next(err))
  }

  static update(req, res, next) {
    Product.update({
      name: req.body.name,
      img_url: req.body.img_url,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category
    }, {where: {id: req.params.id}})
      .then(data => {
        res.status(201).json({
          name: data.name,
          img_url: data.img_url,
          price: data.price,
          stock: data.stock,
          category: data.category
        })
      })
      .catch(err => next(err))
  }

  static patchStocks(req, res, next) {
    Product.update({stock: req.body.stock}, {where: {id: req.params.id}})
      .then(data => {
        res.status(200).json({name: data.name, stock: data.stock})
      })
      .catch(err => next(err))
  }


  static destroy(req, res, next) {
    let findOne
    Product.findOne({where: {id: req.params.id}})
      .then(data => {
        findOne = {
          name: data.name,
          img_url: data.img_url,
          price: data.price,
          stock: data.stock,
          category: data.category
        }
        return Product.destroy({where: {id: req.params.id}})
      })
      .then(data => {
        res.status(200).json(findOne)
      })
      .catch(err => next(err))
  }
}