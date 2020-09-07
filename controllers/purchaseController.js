const { User, Product, UserProduct } = require('../models/index')

class Purchase {
    static add(req, res, next) {
        let purchase = {
            quantity: req.body.quantity,
            UserId: req.decoded.id,
            ProductId: req.params.id,
            isPaid: false
        }
        UserProduct.create(purchase)
            .then(response => {
                return res.status(201).json(response)
            })
            .catch(err => next(err))
    }
    static remove(req, res, next) {
        UserProduct.destroy({ where: { id: req.params.id}})
            .then(response =>{{
                return res.status(201).json('Item removed from cart')
            }})
            .catch(err => next(err))
    }
    static checkout(req, res, next) {
        let purchase = {
            isPaid: true
        }
        UserProduct.update(purchase, { where: { UserId: req.decoded.id }})
            .then(response => {
                if(response == 1) return UserProduct.findAll({ where: { UserId: req.decoded.id}})
                else throw { customMessage: "Failed checking out" }
            })
            .then(response => {
                return res.status(201).json(response)
            })
            .catch(err => next(err))
    }
    static getCart(req, res, next) {
        UserProduct.findAll({ where: { UserId: req.decoded.id }, include: [{ model: Product, as: 'ProductId' }] })
            .then(response => {
                return res.status(201).json(response)
            })
            .catch(err => next(err))
    }
}

module.exports = Purchase