const { Product } = require('../models/index')

class Controller {
    static findAll (req, res, next) {
        const { id } = req.user
        Product.findAll({
            where: {
                AdminId: id
            }
        })
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => next(err))
    }

    static create(req, res, next) {
        const AdminId = req.user.id
        const { name, image_url, stock, price, genre } = req.body
        Product.create({
            name, 
            price,
            stock,
            image_url,
            genre,
            AdminId
        })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        const { id } = req.params
        const updateProduct = req.body
        Product.update(updateProduct, {
            where: {
                id
            }
        })
            .then(_ => {
                res.status(200).json('success')
            })
            .catch(err => next(err))
    }

    static deleteProduct(req, res, next) {
        const { id } = req.params
        let product = {}
        Product.findOne({
            where: {
                id
            }
        })
            .then(response => {
                if(response) {
                    product = response
                    return Product.destroy({
                        where: {
                            id
                        }
                    })
                } else {
                    throw({
                        status: 404,
                        message: {
                            error: 'Product not found'
                        }
                    })
                }
            })
            .then(_ => res.status(200).json(product))
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller