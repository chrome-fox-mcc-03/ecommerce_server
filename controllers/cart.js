const { Cart } = require('../models')

class CartController {
    static add(req, res, next) {
        Cart.findOne({
            where: {
                UserId: req.currentUserId,
                ProductId: req.body.ProductId
            }
        })
            .then(existingCart => {
                console.log(['existed ===>'], existingCart);
                if (existingCart) {
                    next({
                        status: 400,
                        message: 'Product existed, try updating instead of adding a new one'
                    })
                } else {
                    Cart.create({
                        product_qty: 1,
                        paid: false,
                        UserId: req.currentUserId,
                        ProductId: req.body.ProductId
                    })
                        .then(cart => {
                            res.status(201).json(cart)
                        })
                        .catch(err => {
                            next(err)
                        })
                }
            })
    }

    static findAll(req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.currentUserId
            }
        })
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CartController