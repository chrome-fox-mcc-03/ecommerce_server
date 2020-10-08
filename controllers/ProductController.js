const { Product } = require('../models')

class ProductController {
    static findAll(req, res, next) {
        Product.findAll({
            order: ['id']
        })
            .then(response => {
                res.status(200).json({ data: response })
            })
            .catch(next)
    }
    static create(req, res, next) {
        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
        })
            .then(response => {
                res.status(201).json({data: response})
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
                res.status(200).json({data: response})
            })
            .catch(next)
    }
    static update(req, res, next) {
        Product.update({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }, {
            where: {
                id: +req.params.id 
            },
            returning: true
        })
            .then(response => {
                res.status(200).json({data: response})
            })
            .catch(next)
    }
    static delete(req, res, next) {
        Product.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(_ => {
                let msg = 'Product Deleted'
                res.status(200).json({ message: msg })
            })
            .catch(next)
    }
}

module.exports = ProductController