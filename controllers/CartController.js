const {
    Cart,
    Product,
    User,
    sequelize
} = require('../models')
let customError = require("../helpers/errorModel")
let inputParams
let itemId
let UserId
let ProductId
let item

class CartController {

    static showAll(req, res, next) {
        console.log("SHOWING ALL CARTS");
        console.log("WHO'S USER");
        console.log(req.decoded.id);
        Cart.findAll({
                where: {
                    UserId: req.decoded.id
                },
                include: ['Product', 'User']
            })
            .then(response => {
                console.log("CARTS RETRIEVED");
                // console.log(response);
                res.status(200).json({
                    response
                })
            })
            .catch(err => {
                next(err)
            })
    }


    static createCart(req, res, next) {
        console.log(">>> CONTROLLERS: CREATE CART \n");
        UserId = req.decoded.id
        itemId = req.body.ProductId

        Cart.findOne({
                where: {
                    UserId: UserId,
                    ProductId: itemId
                }
            })
            .then(response => {
                console.log("CART IS");
                console.log(response);
                if (response) {
                    console.log("HAVE CART!");
                    // next({status: 400, message: "CART EXISTED. TRY TO UPDATE INSTEAD."})
                    throw new customError(400, "CART EXISTED. TRY TO UPDATE INSTEAD.")
                } else {
                    console.log("NOT YET! LET'S CREATE NEW ONE");
                    Cart.create({
                            UserId: UserId,
                            ProductId: itemId,
                            total_qty: 1,
                            status: "pending"
                        })
                        .then(response1 => {
                            console.log("HELLO NEW CART")
                            res.status(201).json(response1)
                        })
                        .catch(err => {
                            next(err)
                        })
                }
            })
    }


    static addQty(req, res, next) {
        console.log(">>> CONTROLLERS: ADD ITEM TO CART \n");
        Cart.update({
                total_qty: sequelize.literal('total_qty + 1')
            }, {
                where: {
                    id: req.params.cartId
                },
                returning: true
            })
            .then(response => {
                console.log("CART UPDATED: QTY ADD");
                let updated = response[0]
                res.status(201).json({
                    updated
                })
            })
            .catch(err => {
                console.log("ERROR ADDING QTY");
                next(err)
            })
    }


    static reduceQty(req, res, next) {
        console.log(">>> CONTROLLERS: ADD ITEM TO CART \n");
        Cart.update({
                total_qty: sequelize.literal('total_qty - 1')
            }, {
                where: {
                    id: req.params.cartId
                },
                returning: true
            })
            .then(response => {
                console.log("CART UPDATED: QTY MINUS");
                let updated = response[0]
                res.status(201).json({
                    updated
                })
            })
            .catch(err => {
                console.log("ERROR ADDING QTY");
                next(err)
            })
    }


    static deleteCart(req, res, next) {
        console.log(">>> CONTROLLERS: DELETING CART \n");

        Cart.destroy({
                where: {
                    id: +req.params.cartId
                }
            })
            .then(response => {
                console.log("DELETE CART SUCCESS");
                if (response === 1) {
                    res.status(200).json({
                        data: response,
                        message: "Delete Success"
                    })
                } else {
                    console.log("CART NOT FOUND TO DELETE");
                    throw new customError(404, "ENTRY NOT FOUND")
                }
            })
    }

}

module.exports = CartController