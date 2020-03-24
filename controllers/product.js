const { Product, Type } = require('../models')

module.exports = {
  createProduct(req, res, next) {
    const { name, image_url, price, TypeId, stock } = req.body

    Product.create({
      name, image_url, price, TypeId, stock
    })
      .then(data => {
        res.status(201).json({
          message: `success add ${data.name} to list product`
        })
      })
      .catch(next)
  },
  findAllProduct(req, res, next) {
    const { filter } = req.params

    Product.findAll({
      include: [Type],
      order: [['id', 'ASC']]
    })
      .then(data => {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  },
  updateProduct(req, res, next) {
    const { name, image_url, price, TypeId, stock } = req.body
    const { id } = req.params

    Product.update({
      name, image_url, price, TypeId, stock
    }, {
      where: { id }
    })
      .then(_ => {
        res.status(200).json({
          message: 'success update product'
        })
      })
      .catch(next)
  },
  deleteProduct(req, res, next) {
    const { id } = req.params
    const { name } = req.product

    Product.destroy({
      where: { id }
    })
      .then(_ => {
        res.status(200).json({
          message: `success delete ${name}`
        })
      })
      .catch(next)
  },
  findOneProduct(req, res, next) {
    const { id } = req.params
    Product.findOne({
      where: { id },
      include: [Type]
    })
      .then(data => {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  }
}