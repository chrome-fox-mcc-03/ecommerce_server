const { Product } = require('../models');
const { getPayload } = require('../helpers/jwt');
const appError = require('../helpers/appError');
const appPayload = require('../helpers/appPayload');

class ProductController {
    static fetchAll(req, res, next) {
        Product.findAll()
        .then(result => {
            res.status(200).json({
                products: result,
            });
        })
        .catch(next);
    }
    static create(req, res, next) {
        let newItem = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            image_url: req.body.image_url || 'https://via.placeholder.com/150',
        }
        Product.create(newItem)
            .then(result => {
                let createdItem = {
                    id: result.id,
                    name: result.name,
                    price: result.price,
                    stock: result.stock,
                    image_url: result.image_url
                }
                res.status(201).json(createdItem);
            })
            .catch(next);
    }
    static editItem(req, res, next) {
        const id = req.params.productId;
        const body = req.body;
        let edited = {}
        Product.findOne({
            where: {
                id
            }
        })
            .then(result => {
                if (result) {
                    return Product.update(body, {
                        where: {
                            id
                        }
                    })
                } else {
                    throw appError(404, "item not found")
                }
            })
            .then(_ => {
                return Product.findOne({
                    where: { id }
                })
            })
            .then(result => {
                edited = {
                    id: result.id,
                    name: result.name,
                    price: result.price,
                    stock: result.stock,
                    image_url: result.image_url
                }
                res.status(200).json({
                    message: "edit success"
                })
            })
            .catch(next)
    }
    static deleteItem(req, res, next) {
        const id = req.params.productId;
        if (id) {
            let deleted
            Product.findOne({
                where: {
                    id
                }
            })
                .then(result => {
                    if (!result) {
                        throw appError(404, "invalid product id")
                    }
                    deleted = {...result.dataValues};
                    
                    return Product.destroy({
                        where: {
                            id: req.params.productId
                        }
                    })
                })
                .then(_ => {
                    res.status(200).json(deleted);
                })
                .catch(err => {
                    next(err)
                })
        } else {
            next(appError(400, "product id is required"))
        }
    }
};

module.exports = ProductController;