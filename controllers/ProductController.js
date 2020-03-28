const { Product } = require('../models')

class ProductController {
    static addProduct(req, res, next){
        const { name, imageUrl, price, stock } = req.body
        // console.log(imageUrl);
        Product.create({
            name : name,
            image_url : imageUrl,
            price : price,
            stock : stock
        })
        .then((productCreated) => {
            res.status(201).json({
                productCreated
            })
        })
        .catch((err) => {
            next(err)
        })
    }

    static findOneProduct(req, res, next) {
        console.log(req.params, 'dari controller')
        Product.findByPk(req.params.id)
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                next(err)
            });
    }
    
    static fetchProduct(req, res, next){
        Product.findAll()
            .then((result) => {
                res.status(200).json({
                    result
                })
            }).catch((err) => {
                next(err)
            });
    }

    static editProduct(req, res, next){
        
        const { name, imageUrl, price, stock } = req.body
        Product.update({
            name : name,
            image_url : imageUrl,
            price : price,
            stock : stock
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
            next(err)
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
            next(err)
        });
    }
}


module.exports = {
    ProductController
}