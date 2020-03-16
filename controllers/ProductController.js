const { Product } = require('../models')

class ProductController {
    static findAll(req, res, next) {
        Product.findAll()
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)
    }
    static create(req, res, next) {
        Product.create({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            stock: req.body.stock
        })
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                next(err)
            })
    }
    static findOne(req, res, next) {
        Product.findOne({
            where: {
                id: +req.params.id
            }
        })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)
    }
    static update(req, res, next) {
        Product.update({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            stock: req.body.stock
        })
            .next(response => {
                res.status(201).json(response)
            })
            .catch(next)
    }
    static delete(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(response => {
                let msg = 'Product Deleted'
                res.status(200).json(msg)
            })
            .catch(next)
    }
}

module.exports = ProductController