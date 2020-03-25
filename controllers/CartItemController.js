const { CartItem, Cart, Product } = require('../models')

class CartItemController {
    static addToCart(req, res, next) {
        console.log('masuk add to cart')
        console.log(req.body.product.id, 'product id')
        console.log(Number(req.headers.cartid), 'cart id')
        console.log(req.body.quantity, 'qty')
        
        CartItem.findOne({
            where: {
                ProductId: req.body.product.id,
            }
        })
            .then((result) => {
                if(result){
                    let totalQuantity = Number((result.dataValues.quantity) + req.body.quantity)
                    // console.log('totalquantity',totalQuantity)
                    return CartItem.update({
                        ProductId: req.body.product.id,
                        CartId: Number(req.headers.cartid),
                        quantity: totalQuantity,
                        isPaid: false
                    }, {
                        where: {
                            id: result.dataValues.id
                        }
                    })
                } else {
                    return CartItem.create({
                        ProductId: req.body.product.id,
                        CartId: Number(req.headers.cartid),
                        quantity: req.body.quantity,
                        isPaid: false
                    })
                }
            })
            .then((result) => {
                res.status(200).json({
                    result
                })
            })
            .catch((err) => {
                next({err})
            });

    }

    static fetchCart(req, res, next) {
        console.log('masuk fetch cart')
        CartItem.findAll({
            where: {
                CartId: Number(req.headers.cartid)
            },
            include: [Cart, Product]
        })
        .then((result) => {
            res.status(200).json({
                result
            })
        }).catch((err) => {
            next({err})
        });
    }

    static removeOneItem(req, res, next) {
        console.log('remove 1 item', req.params.id)
        CartItem.destroy({
            where: {
                ProductId: req.params.id,
                CartId: Number(req.headers.cartid)
            }
        })
            .then((result) => {
                res.status(200).json({
                    result
                })
            }).catch((err) => {
                next({err})
            });
    }

    static removeAll(req, res, next) {
        console.log('remove all item')
        CartItem.destroy({
            where: {
                CartId: Number(req.headers.cartid)
            }
        })
            .then((result) => {
                res.status(200).json({
                    result
                })
            }).catch((err) => {
                next({ err })
            });
    }
}

module.exports = {
    CartItemController
}