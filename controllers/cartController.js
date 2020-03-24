const { CartItem, Cart, Product } = require('../models/index')
class controller {
    static add(req, res, next){
        let UserId = req.decoded.id
        let {quantity, ProductId, isPaid} = req.body
        let cartId;
        CartItem.findAll({
            include: [{
                model: Product
            }, {
                model: Cart,
                where: {
                    UserId: UserId
                }
            }]
        })
            .then( CartUser => {
                if(CartUser < 1){
                      return CartItem.create({ quantity,
                            ProductId,
                            isPaid,
                            Cart: { UserId }
                            }, 
                            { include: [Cart] })
                        .then( result => {
                            let data = {
                                id: result.id,
                                CartId: result.Cart.id,
                                ProductId: result.ProductId,
                                quantity: result.quantity,
                                isPaid: result.isPaid,
                                createdAt: result.createdAt,
                                updatedAt: result.updatedAt
                            }
                            res.status(201).json(data)
                        })
                        .catch( err => {
                            next(err)
                        })
                } else {
                    cartId = CartUser[0].CartId
                    return CartItem.findOne({
                            include: [{
                                model: Product
                            }, {
                                model: Cart,
                                where: {
                                    UserId: UserId
                                }
                            }],
                            where: {
                                ProductId: ProductId
                            }
                            })
                }
            })
            .then(result => {
                if (!result) {
                    CartItem.create({
                            quantity,
                            ProductId,
                            isPaid,
                            CartId: cartId
                        }, {
                            include: [Cart]
                        })
                        .then(result => {
                            res.status(201).json(result)
                        })
                        .catch(err => {
                            next(err)
                        })
                } else {
                    let nowQuantity = Number(result.quantity) + Number(quantity)
                    CartItem.update({
                            quantity: nowQuantity
                        }, {
                            where: {
                                ProductId: ProductId
                            },
                            returning: true,
                            plain: true
                        })
                        .then(result => {
                            res.status(201).json(result[1])
                        })
                        .catch(err => {
                            next(err)
                        })   
                }
            })
        
    }

    static get(req, res, next) {
        let UserId = req.decoded.id
        CartItem.findAll({
            include: [ {
                model: Product
            }, {
                model: Cart,
                where: {
                    UserId: UserId
                }
            }]
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    
}

module.exports = controller