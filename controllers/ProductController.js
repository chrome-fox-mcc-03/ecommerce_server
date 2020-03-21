const { Product } = require('../models');
const { getPayload } = require('../helpers/jwt');
const appError = require('../helpers/appError');
const appPayload = require('../helpers/appPayload');

class ProductController {
    static fetchAll(req, res, next) {
        // console.log('product fetch');
        Product.findAll()
        .then(result => {
            res.status(200).json({
                products: result,
            });
        })
        .catch(next);
    }
    static create(req, res, next) {
        const user = appPayload(getPayload(req.headers.access_token));
        let newItem = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            UserId: user.id,
            image_url: req.body.image_url,
        }
        Product.create(newItem)
            .then(result => {
                let createdItem = {
                    id: result.id,
                    name: result.name,
                    price: result.price,
                    stock: result.stock,
                    image_url: result.image_url,
                    UserId: result.UserId,
                }
                res.status(201).json(createdItem);
            })
            .catch(next);
    }
    static editItem(req, res, next) {
        const id = req.params.productId;
        const body = req.body;
        let edited
        Product.findOne({
            where: {
                id
            }
        })
            .then(result => {
                if (result) {
                    Product.update(body, {
                        where: {
                            id
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
                            image_url: result.image_url,
                            UserId: result.UserId,
                        }
                        res.status(200).json({
                            message: "edit success"
                        })
                    })
                    .catch(next)
                } else {
                    next(appError(404, "item not found"))
                }
            })
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
                    
                    Product.destroy({
                        where: {
                            id: req.params.productId
                        }
                    })
                    .then(_ => {
                        res.status(200).json(deleted);
                    })
                    .catch(next)
                })
                .catch(err => {
                    console.log("fail to del id ", id)
                    next(err)
                })
        } else {
            next(appError(400, "product id is required"))
        }
    }
};

module.exports = ProductController;