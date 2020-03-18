'use strict'

const { Product, Cart, sequelize } = require('../models');

class CartController {

    static createCart(req, res, next) {
        const UserId = req.loginId;
        const payload = {
            quantity: req.body.quantity,
            cart_status: req.body.cart_status,
            ProductId: req.body.ProductId,
        }

        Product.findOne({
            where: {
                id: ProductId
            }
        }).then(product => {
            payload.UserId = UserId;
            payload.price = payload.quantity * product.price;
            return [product.name, Cart.create(payload)]
        }).then(result => {
            console.log(result)
        }).catch(next)

    }

    static checkOut(req, res, next) {
        const UserId = req.loginId;
        const { carts } = req.body;
        const selected = [];
        const updateSelected = [];
        const cartSelected = [];
        let newSelect;

        sequelize.transaction(t => {
            carts.forEach(cart => {
                newSelect = Product.findOne({
                    where: {
                        id: cart.ProductId
                    }, transaction: t
                });
                selected.push(newSelect)
            });

            return Promise.all(selected).then(products => {

                products.forEach((product, index) => {
                    newSelect = Product.update({
                        name: product.name,
                        price: product.price,
                        stock_quantity: product.stock_quantity - carts[index].quantity
                    }, {
                        where: {
                            id: product.id
                        }, transaction: t
                    });
                    updateSelected.push(newSelect);
                });

                return Promise.all(updateSelected).then(products => {
                    carts.forEach(cart => {
                        newSelect = Cart.update({
                            id: cart.id,
                            price: cart.price * cart.quantity,
                            quantity: cart.quantity,
                            cart_status: true,
                            UserId: cart.UserId,
                            ProductId: cart.ProductId

                        }, {
                            where: {
                                id: cart.id
                            },
                            transaction: t
                        })
                        cartSelected.push(newSelect);
                    });
                    return Promise.all(cartSelected)
                })


            });

        }).then(result => {
            console.log(result)
        }).catch(next);
    }

    static cartUpdate(req, res, next) {
        const UserId = req.loginId;
        const { id } = req.params;
        const payload = {
            quantity: req.body.quantity,
            cart_status: req.body.cart_status,
            ProductId: req.body.ProductId,
        }
        const cartPayload = {};

        Product.findByPk(payload.ProductId).then(product => {
            if (product.stock >= payload.quantity) {
                cartPayload.UserId = UserId;
                cartPayload.ProductId = payload.ProductId;
                cartPayload.quantity = payload.quantity;
                cartPayload.cart_status = payload.cart_status;
                cartPayload.price = product.price * payload.quantity;

                return Cart.update(cartPayload, {
                    where: {
                        id: +id
                    }
                });
            } else {
                next({ status: 400, message: 'Not Enough Product' });
            }
        }).then(cart => {
            console.log(cart)
        }).catch(next);
    }

    static emptyCart(req, res, next) {
        const { id } = req.params;
        Cart.destroy({
            where: {
                id
            }
        }).then(result => {
            console.log(result)

        }).catch(next);

    }

    static findRecentProducts(req, res, next) {
        const UserId = req.loginId;
        Cart.findAll({
            include: [{
                model: Product,
                attributes: ['name', 'price']
            }],
            where: {
                UserId,
                cart_status: false
            },
            order: [['id', 'ASC']]
        }).then(carts => {
            if (carts) {
                console.log(carts)
            } else {
                console.log(carts)
            }
        }).catch(next)
    }

    static cartHistory(req, res, next) {
        const UserId = req.loginId;
    }

}

module.exports = { CartController }