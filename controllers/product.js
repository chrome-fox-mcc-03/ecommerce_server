const { Product } = require('../models')

class ProductController {
    static add(req, res, next) {
        console.log('> > > >', req.body, '< < < <');
        
        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        })
            .then(newProduct => {
                res.status(201).json(newProduct)
            })
            .catch(err => {
                next(err)
            })
    }

    static findAll(req, res, next) {
        Product.findAll()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController