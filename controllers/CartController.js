const { Cart, Product } = require('../models')
const Sequelize = require('sequelize');
const { gt } = Sequelize.Op;


class CartController {
    static findAllActive (req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.decoded.id,
                quantity: {
                    [gt]: 0
                }
            },
            include: [ Product ],
            order: [['id', 'ASC']]
        })
            .then((response) => {
                res.status(200).json({
                    data: response
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static addToCart ( req, res, next ) {
        const ProductId = req.body.ProductId
        const UserId = req.decoded.id
        let productStock;
        let productPrice;

        Product.findByPk(ProductId)
            .then((response) => {
                productStock = response.stock
                productPrice = response.price
                return Cart.findOrCreate({
                    where: {
                        UserId,
                        ProductId
                    },
                    defaults: {
                        UserId: UserId,
                        ProductId: ProductId,
                        quantity: 1,
                        totalPrice: productPrice,
                        isPaid: false
                    }
                })
            })
            .spread((cart, created) => {
                if (created) {
                    return cart
                }
                if (cart.quantity === productStock) {
                    const err = {
                        name: 'custom',
                        status: 400,
                        message: 'You reached stock limit'
                    }
                    throw err
                }
                return Cart.update({
                    UserId: UserId,
                    ProductId: ProductId,
                    quantity: cart.quantity += 1 ,
                    totalPrice: cart.totalPrice += productPrice,
                    isPaid: false
                },{
                    where: {
                        UserId,
                        ProductId
                    }
                })
            })
            .then((response) => {
                res.status(200).json({
                    message: 'Cart successfully updated'
                })
            })
            .catch((err) => {
                next(err)
            })   
    }
    
    static reduceFromCart (req, res, next) {
        const CartId = req.params.id

        Cart.findByPk(CartId)
            .then((response) => {
                if (response) {
                    if (response.quantity === 1) {
                        return Cart.destroy({
                            where: {
                                id: CartId
                            }
                        })
                    }  else if (response.quantity > 1) {
                        const reducedQuantity = {
                            totalPrice: response.totalPrice -= (response.totalPrice / response.quantity),
                            ProductId: response.ProductId,
                            UserId: response.UserId,
                            quantity: response.quantity -= 1,
                            isPaid: false
                        }
                        return Cart.update(reducedQuantity, {
                            where: {
                                id: CartId
                            }
                        })
                    }
                } else {
                    let err = {
                        name : 'custom',
                        status : 400,
                        message : 'Cart not found'
                    }
                    throw err
                }
            })
            .then((response) => {
                res.status(200).json({
                    message: 'Cart successfully updated'
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    static deleteCart (req, res, next) {
        const CartId = req.params.id

        Cart.destroy({
            where: {
                id: CartId
            }
        })
            .then((response) => {
                res.status(200).json({
                    message: ['Cart successfully deleted']
                })
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = CartController