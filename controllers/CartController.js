const { Cart, CartItem } = require('../models')

class CartController {
    static createCart(req, res, next) {
        console.log('masuk route add to cart')
        Cart.create({
            UserId: req.user.id
        })
            .then((cartCreated) => {
                // console.log(cartCreated)
                // req.cart.id = cartCreated.dataValues.id
                res.status(200).json({
                    cartId: cartCreated.dataValues.id
                })
            }).catch((err) => {
                next({err})
            });
    }

    static removeCart(req, res, next) {
        Cart.destroy({
            where: {
                id: req.headers.cartid
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
}

module.exports = {
    CartController
}