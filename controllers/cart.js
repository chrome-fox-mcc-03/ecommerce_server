const { Cart, Product } = require('../models')

module.exports = class Controller{
  static create(req, res, next) {
    Cart.create({
      UserId: req.id,
      ProductId: req.body.ProductId
    })
      .then(data => {
        res.status(201).json({UserId: data.UserId, ProductId: data.ProductId})
      })
      .catch(err => next(err))
  }

  static findAll(req, res, next) {
    Cart.findAll({
      where: {UserId: req.id},
      order: [['id', 'ASC']]
    })
      .then(data => {
        let result = []
        data.forEach(el => result.push({UserId: el.UserId, ProductId: el.ProductId}))
        res.status(200).json(result)
      })
      .catch(err => next(err))
  }

  static findOne(req, res, next) {
    Cart.findOne({where: {id: req.params.id}})
      .then(data => {
        res.status
      })
  }

  static destroy(req, res, next) {
    let findOne
    Cart.findOne({where: {id: req.params.id}})
      .then(data => {
        findOne = data
        return Cart.destroy({where: {id: req.params.id}})
      })
      .then(data => res.status(200).json(findOne))
      .catch(err => next(err))
  }
}