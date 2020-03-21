const { Product } = require('../models')

class ProductController{
    static create(req, res, next){
        let { name, image_url, price, stock } = req.body
        Product
            .create({ name, image_url, price, stock })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static findAll(req, res, next){
        Product
            .findAll()
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static findOne(req, res, next){
        Product
            .findOne({
                where : {
                    id : req.params.id
                }
            })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static update(req, res, next){
        let { name, image_url, price, stock } = req.body
        Product
            .update({ name, image_url, price, stock }, {
                where: {
                    id : req.params.id
                }
            })
            .then(product => {
                return Product.findOne({
                    where: {
                        id : req.params.id
                    }
                })
            })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static remove(req, res, next){
        let productDelete 
        Product
            .findOne({
                where: {
                    id : req.params.id
                }
            })
            .then(product => {
                if(product){
                    productDelete = product
                    return Product.destroy({
                        where: {
                            id : req.params.id
                        }
                        
                    })
                }
            })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }
}

module.exports = ProductController