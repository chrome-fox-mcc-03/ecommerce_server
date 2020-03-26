"use strict"

const { Cart, Product, User, CartProduct } = require('../models/index')

class Controller {
    static addToCart (req, res, next) {
        const data = {
            quantity: req.body.quantity,
            cart_id: null,
            product_id: req.body.product_id,
            status: 'Ordered'
        }
        Cart.findOne({
            where: {
                user_id: req.decoded.id
            }
        })
        .then(result => {
            if(!result){
                return Cart.create({
                    user_id: req.decoded.id
                })
            } else {
                return result
            }
        })
        .then(result => {
            data.cart_id = result.id
            return Product.findOne({
                where: {
                    id: data.product_id
                }
            })
        })
        .then(result => {
            if((result.stock - data.quantity) < 0) {
                throw({
                    status: 400,
                    msg: 'Your quantity exceeded the items stock'
                })
            } else {
                return CartProduct.findOne({
                    where: {
                        product_id: data.product_id,
                        cart_id: data.cart_id,
                        status: 'Ordered'
                    }
                })
            }
        })
        .then(result => {
            if(result){
                return CartProduct.increment('quantity', {
                    by: data.quantity,
                    where: {
                        product_id: data.product_id,
                        cart_id: data.cart_id,
                        status: 'Ordered'
                    }
                })
            } else {
                return CartProduct.create(data)
            }
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next => console.log(next))
    }

    static finishOrder (req, res, next) {
        Cart.findOne({
            where: {
                user_id: req.decoded.id
            }
        })
        .then(result => {
            return CartProduct.update({
                status: 'Finished'
            }, {
                where: {
                    status: 'Ordered',
                    cart_id: result.id
                },
                returning: true
            })
        })
        .then(results => {
            let promises = []
            results[1].forEach(el => {
                const promise = new Promise((res, rej) => {
                    Product.decrement('stock', {
                        by: el.quantity,
                        where: {
                            id: el.product_id
                        }
                    })
                    .then(_ => res())
                    .catch(_ =>  rej())
                })
                promises.push(promise)
            })
            Promise.all(promises)
            .then(result => {
                console.log('helo')
                res.status(201).json(result)
            })
            .catch(next)
        })
    }

    static findAllCart(req, res, next) {
        Cart.findOne({
            where: {
                user_id: req.decoded.id
            },
            include: {
                model: Product,
                through:{attributes:['quantity', 'createdAt', 'status']}
            },
            order: [
                [Product, 'id', 'asc']
            ]
        })
        .then(result => {
                res.status(201).json(result)
        })
        .catch(next)
    }

    static editQuantity(req, res, next) {
        let cartId = null
        let totalQuantity
        if(req.body.quantity === 1) totalQuantity = req.body.totalQuantity
        Cart.findOne({
            where: {
                user_id: req.decoded.id
            }
        })
        .then(result => {
            cartId = result.id
            return Product.findOne({
                where: {
                    id: req.body.product_id
                }
            })
        })
        .then(result => {
            if(totalQuantity && (totalQuantity + 1) > result.stock) {
                throw({
                    status: 400,
                    msg: 'Your quantity exceeded the items stock'
                })
            } 
        })
        .then(_ => {
            return CartProduct.increment('quantity', {
                by: req.body.quantity,
                where: {
                    product_id: req.body.product_id,
                    cart_id: cartId
                }
            })
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }

    static deleteCartProduct(req, res, next){
        let cartId = null
        Cart.findOne({
            where: {
                user_id: req.decoded.id
            }
        })
        .then(result => {
            cartId = result.id
        })
        .then(_ => {
            return CartProduct.destroy({
                where: {
                    product_id: req.body.product_id,
                    cart_id: cartId
                }
            })
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }

}   

module.exports = Controller