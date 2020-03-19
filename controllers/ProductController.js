const { Product } = require('../models')

class ProductController {
    static addProduct(req, res, next){
        const { name, image_url, price, stock } = req.body
        Product.create({
            name,
            image_url,
            price,
            stock
        })
        .then((productCreated) => {
            res.status(201).json({
                productCreated
            })
        })
        .catch((err) => {
            res.status(401).json({
                err
            })
        })
    }
    
    static fetchProduct(req, res, next){
        Product.findAll()
            .then((result) => {
                res.status(200).json({
                    result
                })
            }).catch((err) => {
                res.status(500).json({
                    err
                })
            });
    }

    static editProduct(req, res, next){
        // console.log('we are in edit product controller');
        
        const { name, image_url, price, stock } = req.body
        Product.update({
            name,
            image_url,
            price,
            stock
        }, {
            where :{
                id : req.params.id
            }
        }) 
        .then((result) => {
            res.status(200).json({
                result
            })
        }).catch((err) => {
            res.status(401).json({
                err
            })
        });
    }

    static deleteProduct(req, res, next){
        Product.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.status(200).json({
                result
            })
        }).catch((err) => {
            res.status(500).json({
                err
            })
        });
    }
}


module.exports = {
    ProductController
}