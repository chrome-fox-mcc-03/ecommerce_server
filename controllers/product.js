const { Product } = require('../models')

class ProductController {
    static add(req, res, next) {
        console.log('> > > >', req.body, '< < < <');

        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        })
            .then(newProduct => {
                res.status(201).json(newProduct)
            })
            .catch(err => {
                next(err)
            })
    }

    static findAll(req, res, next) {
        Product.findAll({
            order: [['updatedAt', 'DESC']]
        })
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(product => {
                if (product) {
                    res.status(200).json(product)
                } else {
                    next({
                        status: 404,
                        message: 'Product not found'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        Product.update({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(updatedProduct => {
                console.log('--- Updated Successfully ---', updatedProduct[1][0]);
                res.status(200).json(updatedProduct[1][0])
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        console.log('deeeleeeete');
        
        let id = req.params.id;
        let deletedProduct;
        Product.findByPk(id)
            .then(product => {
                if (product) {
                    deletedProduct = product
                    Product.destroy({
                        where: {
                            id
                        }
                    })
                        .then(() => {
                            res.status(200).json(deletedProduct)
                        })
                        .catch(err => {
                            next(err)
                        })
                } else {
                    next({
                        status: 404,
                        message: 'Product not found'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController