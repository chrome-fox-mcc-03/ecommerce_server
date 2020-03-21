const { Product } = require('../models');

class ProductController {
    static createProduct(req, res, next) {
        let { name, price, image_url, stock } = req.body;
        
        Product.create({
            name,
            price,
            image_url,
            stock
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => {
            next(error)
        })
    }

    static showAll(req, res, next) {
        Product.findAll()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            next(error);
        })
    }

    static findById(req, res, next) {
        Product.findOne({
            where: {
                id: id
            }
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            next({
                status: 404,
                message: `cannot find product with spesific id`
            });
        })
    }

    static deleteById(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(result => {
            res.status(200).json(`you've successfully deleted item from your store`)
        })
        .catch(error => {
            next({
                status: 404,
                msg: `product with specific id cannot be found`
            })
        })
    }

    static editById(req, res, next) {
        let { name, price, img_url, stock } = req.body;
        
        Product.update({
            name,
            price,
            img_url,
            stock
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            next({
                status: 404,
                msg: `product with specific id cannot be found`
            })
        })
    }
}

module.exports = ProductController;