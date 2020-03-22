const { Product } = require('../models/index')

class Controller {
    static create(req, res, next) {
        let { name, image_url, price, stock } = req.body
        Product.create({
            name, image_url, price, stock
        }).then(product => {
            return res.status(201).json(product)
        })
        .catch(err => next(err))
    }
    static read(req, res, next) {
        Product.findAll()
            .then(products => {
                return res.status(201).json(products)
            })
            .catch(err => next(err))
    }
    static update(req, res, next) {
        let { name, image_url, price, stock } = req.body
        Product.update({
            name, image_url, price, stock
        }, { where: { id: req.params.id } })
            .then(response => {
                if(response == 0) throw { customMessage: "Item not found" }
                else return Product.findOne({ where: { id: req.params.id } })
            })
            .then(product => res.status(201).json(product))
            .catch(err => next(err))
    }
    static delete(req, res, next) {
        Product.destroy({ where: { id: req.params.id } })
            .then(response => {
                if(response == 0) throw { customMessage: "Item not found" }
                else return res.status(200).json(`Deleted item id ${req.params.id}`)
            })
            .catch(err => next(err))
    }
}

module.exports = Controller