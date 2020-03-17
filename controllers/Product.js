'use strict'

const { Product } = require('../models')

class ProductController {

    static findAll(req, res, next) {
        Product.findAll().then(products => {
            console.log(products)
        }).catch(next)
    }

    static findById(req, res, next) {
        const { id } = req.params;
        Product.findByPk(id).then(product => {
            if (product) {
                console.log(product)
            } else {
                next({ status: 404, message: `Product not found` })
            }
        }).catch(next)

    }

    static createProduct(req, res, next) {
        const payload = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock_quantity: req.body.stock_quantity,
            img_url: req.body.img_url
        };

        Product.create(payload).then(product => {
            console.log(product);
        }).catch(next);
    }

    static updateProduct(req, res, next) {
        const { id } = req.params;
        const payload = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock_quantity: req.body.stock_quantity,
            img_url: req.body.img_url
        };

        Product.update(payload, {
            where: {
                id
            },
            returning: true
        }).then(response => {
            console.log(response);
        }).catch(next)

    }

    static deleteProduct(req, res, next) {
        const { id } = req.params;
        Product.destroy({
            where: {
                id
            }
        }).then(response => {
            console.log(response)
        }).catch(next)
    }

}

module.exports = { ProductController }