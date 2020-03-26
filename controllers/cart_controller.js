const { Cart } = require('../models');
const { Product } = require('../models');

class CartController {
    static showAll(req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.decoded.id
            }
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                next({
                    status: 500,
                    message: `internal server error`
                })
            })
    }

    static addCart(req, res, next) {
        let { quantity } = req.body
        let { id } = req.params
        let UserId = req.decoded.id
        let productStock;
        let stockLeft;

        Product.findOne({
            where: {
                id
            }
        })
            .then(result => {
                // console.log(result);
                let productName = result.name;
                let productImage = result.image_url;
                let productPrice = result.price * quantity;
                productStock = result.stock;

                return Cart.findOne({
                    where: {
                        productName,
                        UserId
                    }
                })
                    .then(result => {
                        if (result) {
                            let cartQuantity = Number(quantity) + Number(result.quantity);
                            let productPrice = result.productPrice/Number(result.quantity) * cartQuantity
                            console.log(cartQuantity);
                            Cart.update({
                                quantity: cartQuantity,
                                productPrice
                            }, {
                                where: {
                                    id: result.id
                                }
                            })
                                .then(result => {
                                    res.status(200).json(`items has been successfully added to cart`)
                                })
                        } else {
                            Cart.create({
                                productName,
                                productImage,
                                productPrice,
                                quantity,
                                UserId,
                                ProductId: id
                            })
                                .then(result => {
                                    stockLeft = productStock - quantity
                                    //     return Product.update(
                                    //         {
                                    //             stock: stockLeft
                                    //         }, {
                                    //         where: {
                                    //             id
                                    //         }
                                    //     }
                                    //     )
                                    // })
                                    // .then(result => {
                                    res.status(200).json(`items has been successfully added to cart`)
                                })
                                .catch(error => {
                                    next(error)
                                })
                        }
                    })
            })
    }

    static editCart(req, res, next) {
        let quantityRequested = req.body.quantity;
        let { id } = req.params;
        let quantityBefore;
        let quantityDifference;
        let productStock;
        
        Cart.findOne({
            where: {
                id
            }
        })
            .then(result => {
                let productPrice = result.productPrice/Number(result.quantity) * quantityRequested
                quantityBefore = result.quantity
                return Cart.update({
                    quantity: quantityRequested,
                    productPrice
                }, {
                    where: {
                        id
                    }, returning: true
                })
                    .then(result => {
                        // console.log(result[1][0].ProductId, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PRODUCT ID');
                        // quantityDifference = quantityRequested - quantityBefore;
                        // console.log(quantityDifference, quantityRequested, quantityBefore);
                        //     return Product.findOne({
                        //         where: {
                        //             id: result[1][0].ProductId
                        //         }
                        //     })
                        // })
                        // .then(result => {                        
                        //     productStock = result.stock - quantityDifference
                        //     // console.log(productStock, result.stock, quantityDifference);
                        //     return Product.update({
                        //         stock: productStock
                        //     }, {
                        //         where: {
                        //             id: result.id
                        //         }, returning: true
                        //     })
                        // })
                        // .then(result => {
                        res.status(200).json(`update items quantity success`)
                    })
                    .catch(error => {
                        console.log(error);
                        next({
                            status: 500,
                            message: `internal server error`
                        })
                    })
            })
    }

    static deleteCart(req, res, next) {
        let id = req.params.id;
        let stockAfter;
        let ProductId;
        let restock;

        Cart.findOne({
            where: {
                id
            }
        })
            .then(result => {
                stockAfter = result.quantity
                ProductId = result.ProductId
                return Cart.destroy({
                    where: {
                        id
                    }
                })
            })
            .then(result => {
                //     return Product.findOne({
                //         where: {
                //             id: ProductId
                //         }
                //     })
                // })
                // .then(result => {
                //     restock = result.stock + stockAfter
                //     return Product.update({
                //         stock: restock
                //     },{
                //         where: {
                //             id: ProductId
                //         },
                //         returning: true
                //     })
                // })
                // .then(result => {
                res.status(200).json(`remove items from cart success`)
            })
            .catch(error => {
                next({
                    status: 500,
                    message: `internal server error`
                })
            })
    }
}

module.exports = CartController;