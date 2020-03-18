const {
    Product
} = require('../models')

class controller {
    static add(req, res, next) {
        let {
            name,
            image_url,
            price,
            stock
        } = req.body
        Product.create({
                name,
                image_url,
                price,
                stock
            })
                .then(result => {
                    let data = {
                        id: result.id,
                        name: result.name,
                        image_url: result.image_url,
                        price: result.price,
                        stock: result.stock
                    }
                    res.status(201).json(data)
                })
                .catch(err => {
                    next(err)
                })
    }

    static get(req, res, next) {
        Product.findAll()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        let productId = req. params.id
        let {
            name,
            image_url,
            price,
            stock
        } = req.body
        Product.update({
            name, image_url, price, stock
        }, {
            where:{
                id: productId
            },
            returning: true,
                plain: true
        })
            .then(result=>{
                res.status(200).json(result[1])
            })
            .catch(err=>{
                next(err)
            })
    }

    static delete(req, res, next) {
        let productId = req.params.id
        let data;
        Product.findByPk(productId)
            .then(result=>{
                data = result
                return Product.destroy({
                    where:{
                        id: productId
                    }
                })
            })
            .then(result=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                next(err)
            })
    }

}

module.exports = controller