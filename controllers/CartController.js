const { Cart, CartItem } = require('../models')

class CartController {
    static createCart(req, res, next) {
        // console.log(req.user, 'CART CONTROLLER')
        Cart.create({
            UserId: req.user.id
        })
        .then((result) => {
            console.log(result)
            res.status(200).json({
                result
            })
        }).catch((err) => {
            next({err})
        });

        // Cart.findOne({
        //     where: {
        //         UserId: req.user.UserId
        //     }
        // })
        //     .then((cartFound) => {

        //         if(cartFound){
        //             // console.log(cartFound, 'cart already found')
        //             res.status(200).json({
        //                 cartId: cartFound.dataValues.id
        //             })
        //         } else {
        //             console.log('create new cart')
        //             return Cart.create({
        //                 UserId: req.user.id
        //             })
        //         }
        //     }) .then((cartCreated) => {
        //             // console.log(cartCreated)
        //             res.status(201).json({
        //                 cartId: cartCreated.dataValues.id
        //             })
        //     }).catch((err) => {
        //         next({err})
        //     });
        
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