const { Product } = require('../models');
const { getPayload } = require('../helpers/jwt');
const appError = require('../helpers/appError');
const appPayload = require('../helpers/appPayload');

class ProductController {
    static fetchAll(req, res, next) {
        const user = appPayload(getPayload(req.headers.access_token));
        Product.findAll({
            where: {
                UserId: user.id,
            }
        })
        .then(result => {
            console.log(result);
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
};

module.exports = ProductController;