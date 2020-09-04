const { Product } = require('./../models')

class ControllerProduct{
    static getProducts(req,res, next){
        Product.findAll()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                next(err)
            })
    }
    static create(req,res,next) {
        let { name, image_url, price, stock } = req.body
        price = Number(price)
        stock = Number(stock)
        Product.create({
            name,
            image_url,
            price,
            stock
        })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
    static getById(req,res,next){
        const id = req.params.id 
        Product.findByPk(id)
            .then(result => {
                if (!result) {
                    const error = {
                        name: "product not found"
                    }
                    throw error
                } else {
                    res.status(200).json(result)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req,res,next){
        const id = req.params.id
        let { name, image_url, price, stock } = req.body
        price = Number(price)
        stock = Number(stock)

        Product.update({
            name,
            image_url,
            price,
            stock
        },{
            where: {
                id
            },
            returning: true
        })
            .then(result => {
                if (result[1].length === 0) {
                    const error = {
                        name: "product not found"
                    }
                    throw error
                } else {
                    let updated = result[1][0]
                    res.status(201).json(updated)
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static delete(req,res,next){
        const id = req.params.id
        let deleted
        Product.findByPk(id)
            .then(result => {
                if (!result) {
                    const error = {
                        name: "product not found"
                    }
                    throw error
                } else {
                    deleted = result
                    return Product.destroy({
                        where: {
                            id
                        }
                    })
                }
            })
            .then(result => {
                res.status(203).json(deleted)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControllerProduct