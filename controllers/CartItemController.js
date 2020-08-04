const { Cart, Product, CartItem, Transaction, TransactionDetail, sequelize } = require('../models/index')

class CartItemController {
    static findAll(req, res, next) {
        CartItem.findAll({ include: [Product] })
            .then(result => {
                res.status(200).json({ cartitems: result })
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        let id = req.params.id
        CartItem.findByPk(id)
            .then(result => {
                res.status(200).json({ cartitem: result })
            })
            .catch(next)
    }

    static create(req, res, next) {
        Cart.findOne({ where: { UserId: req.currentUserId } })
            .then(result => {
                if (result) {
                    const cartItem = {
                        quantity: req.body.quantity,
                        ProductId: req.body.ProductId,
                        CartId: result.id
                    }
                    CartItem.create(cartItem)
                        .then(cartitem => {
                            CartItem.findByPk(cartitem.id, { include: [Product] })
                                .then(newCartItem => {
                                    res.status(201).json({
                                        cartitem: newCartItem
                                    })
                                })
                                .catch(next)
                        })
                        .catch(next)
                } else {
                    Cart.create({ UserId: req.currentUserId })
                        .then(result => {
                            const cartItem = {
                                quantity: req.body.quantity,
                                ProductId: req.body.ProductId,
                                CartId: result.id
                            }
                            CartItem.create(cartItem)
                                .then(cartitem => {
                                    CartItem.findByPk(cartitem.id, { include: [Product] })
                                        .then(newCartItem => {
                                            res.status(201).json({
                                                newCartItem
                                            })
                                        })
                                        .catch(next)
                                })
                                .catch(next)
                        })
                        .catch(next)
                }
            })
            .catch(next)
    }

    static edit(req, res, next) {
        const id = req.params.id
        let data = {
            quantity: req.body.quantity,
            ProductId: req.body.ProductId
        }
        CartItem.update(data, { where: { id }, returning: true })
            .then(result => {
                CartItem.findByPk(id, { include: [Product] })
                    .then(cartitem => {
                        res.status(200).json({ cartitem })
                    })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const { id } = req.params
        CartItem.destroy({ where: { id } })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    static checkout(req, res, next) {

        Cart.findOne({ where: { UserId: req.currentUserId } })
            .then(cart => {
                CartItem.findAll({ where: { CartId: cart.id }, include: [Product] })
                    .then(cartitems => {
                        const transactions = []
                        let totalPrice = 0

                        cartitems.forEach(item => {
                            const cartItem = {
                                productName: item.Product.name,
                                price: item.Product.price,
                                quantity: item.quantity,
                                img_url: item.Product.img_url,
                                ProductId: item.Product.id
                            }
                            transactions.push(cartItem)
                            totalPrice += item.Product.price * item.quantity

                        })
                        const products = cartitems.map(el => {
                            return { id: el.Product.id, stock: el.Product.stock - el.quantity }
                        })
                        let transaction = { UserId: req.currentUserId, totalPrice }

                        return sequelize
                            .transaction(function (t) {
                                return Transaction.create(transaction, { transaction: t }).then(function (
                                    result
                                ) {
                                    const transactionId = result.id
                                    transactions.forEach(el => {
                                        el.TransactionId = transactionId
                                    })

                                    return TransactionDetail.bulkCreate(transactions, {
                                        transaction: t
                                    }).then(result => {
                                        return Product.bulkCreate(products, {
                                            updateOnDuplicate: ['stock']
                                        }).then(result => {
                                            return Cart.destroy({
                                                where: { id: cart.id },
                                                transaction: t
                                            }).then(result => {
                                                return CartItem.destroy({ where: { CartId: cart.id } })
                                            })
                                        })
                                    })
                                })
                            })
                            .then(result => {
                                res.status(200).json(result)
                            })
                            .catch(next)
                    })
                    .catch(next)
            })
            .catch(next)
    }
}

module.exports = CartItemController