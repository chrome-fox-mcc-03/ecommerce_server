const {
    Cart,
    Product,
    User,
    sequelize
} = require('../models')
const {
    customError
} = require("../helpers/errorModel")
let inputParams
let cart
let itemId
let UserId
let ProductId
let qtyInStock
let disthrow
let item

class CartController {

    static showAllCarts(req, res, next) {
        console.log("SHOWING ALL CARTS");
        console.log("WHO'S USER");
        console.log(req.decoded.id);
        Cart.findAll({
                where: {
                    UserId: req.decoded.id,
                    checked_out: false
                },
                order: [
                    ['updatedAt', 'DESC']
                ],
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


    static showTxnLog(req, res, next) {
        console.log("SHOWING ALL CARTS");
        console.log("WHO'S USER");
        console.log(req.decoded.id);
        Cart.findAll({
                where: {
                    UserId: req.decoded.id,
                    checked_out: true
                },
                order: [
                    ['updatedAt', 'DESC']
                ],
                include: ['Product', 'User']
            })
            .then(response => {
                console.log("TXS RETRIEVED");
                console.log(response);
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

        inputParams = {
            UserId: UserId,
            ProductId: itemId,
            total_qty: 1,
            checked_out: false
        }

        Cart.findOne({
                where: {
                    UserId: UserId,
                    ProductId: itemId,
                    checked_out: false
                }
            })
            .then(response => {
                console.log("CART IS");

                // console.log(response);
                if (response) {
                    cart = response.dataValues
                    console.log("HAVE CART ALREADY!");
                    // let disthrow =  new customError(400, "ACTIVE CART EXISTED. TRY TO UPDATE INSTEAD.")
                    // // next({status: 400, message: "CART EXISTED. TRY TO UPDATE INSTEAD."})
                    // next(disthrow)
                    if (cart) {
                        return Cart.update({
                            total_qty: sequelize.literal('total_qty + 1')
                        }, {
                            where: {
                                id: cart.id
                            },
                            include: ['Product', 'User'],
                            returning: true
                        })
                    } else {
                        next((new customError(404, 'CART NOT FOUND')))
                    }


                } else {
                    console.log("NOT YET! LET'S CREATE NEW ONE");
                    return Cart.create(inputParams)
                }
            })
            .then(response => {
                console.log("ADDED ITEM TO CART")
                res.status(201).json(response)
            })
            .catch(err => {
                next(err)
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
                include: ['Product', 'User'],
                returning: true
            })
            .then(response => {
                console.log("WHAT'S RESPONSE?");
                // console.log(response);
                if (response[0] !== 0) {
                    console.log("CART UPDATED: QTY ADD");
                    let updated = response[1][0]
                    res.status(201).json({
                        updated
                    })
                } else {
                    //  disthrow =  new customError(404, "ENTRY NOT FOUND")
                    // // next({status: 400, message: "CART EXISTED. TRY TO UPDATE INSTEAD."})
                    // next(disthrow)
                    throw new customError(404, 'ENTRY NOT FOUND')
                }

            })
            .catch(err => {
                console.log("ERROR ADDING QTY");
                next(err)
            })
    }


    static reduceQty(req, res, next) {
        console.log(">>> CONTROLLERS: REMOVE ONE ITEM FROM CART \n");

        // CHECK IF CART QTY IS ONE. IF SO, JUST DELETE CART
        Cart.findOne({
                where: {
                    id: req.params.cartId
                }
            })
            .then(response => {
                console.log("ONE LEFT?");
                // console.log(response);
                if (response) {
                    if (response.dataValues.total_qty === 1) {
                        return Cart.destroy({
                            where: {
                                id: req.params.cartId
                            }
                        })
                    } else {
                        console.log("NAH! STILL HAVE SOME SUPPLY!");
                        return Cart.update({
                            total_qty: sequelize.literal('total_qty - 1')
                        }, {
                            where: {
                                id: req.params.cartId
                            },
                            include: ['Product', 'User'],
                            returning: true
                        })
                    }
                } else {
                    throw new customError(404, 'ENTRY NOT FOUND')
                }

            })
            // Cart.update({
            //         total_qty: sequelize.literal('total_qty - 1')
            //     }, {
            //         where: {
            //             id: req.params.cartId
            //         },
            //         include: ['Product', 'User'],
            //         returning: true
            //     })
            .then(response1 => {
                console.log("CART UPDATED: QTY REDUCED");
                res.status(201).json(response1)
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
            .catch(err => {
                next(err)
            })
    }


    static checkout(req, res, next) {
        console.log("CHECKING OUT CART");
        console.log("ID to checkout is");
        console.log(req.params.cartId);
        let qtyToCheckOut
        let thing
        let cart
        let newQty
        Cart.update({
                checked_out: true
            }, {
                where: {
                    id: req.params.cartId
                },
                include: ['Product', 'User'],
                returning: true
            })
            .then(response => {
                // console.log("WHADAP?");
                // console.log(response);
                if (response[0] !== 0) {
                    console.log("CART CHECKEDOUT. NOW UPDATING STOCK");
                    // console.log(response[1][0].dataValues)
                    cart = response[1][0].dataValues
                    qtyToCheckOut = Number(cart.total_qty)
                    itemId = cart.ProductId

                    console.log("CHECK IF STOCK SUFFICIENT");
                    Product.findOne({
                            where: {
                                id: itemId
                            }
                        })
                        .then(response1 => {
                            console.log("HELLO! THING IS");
                            console.log(response1);
                            qtyInStock = response1.dataValues.stock

                            if (qtyInStock >= qtyToCheckOut) {
                                return Product.increment({
                                    stock: -qtyToCheckOut
                                }, {
                                    where: {
                                        id: itemId
                                    },
                                    returning: true
                                })
                            } else {
                                next((new customError(400, "INSUFFICIENT STOCK")))
                            }
                        })
                } else {
                    throw new customError(404, 'ENTRY NOT FOUND')
                }
            })
            .then(response1 => {
                console.log("PRODUCT STOCK UPDATED");
                console.log(response1);
                thing = response1
                let payload = [{
                        product: response1
                    },
                    {
                        cart: cart
                    },
                    {
                        message: "CHECKOUT & UPDATE SUCCESS"
                    }
                ]
                res.status(201).json({
                    data: payload
                })
            })
            .catch(err => {
                next(err)
            })
    }


     static massCheckout(req, res, next) {
        console.log("CHECKING OUT CART EN MASSE \n");
        let qtyToCheckOut
        let thing
        let cart
        let newQty
        let carts
        let products
        let updated_product
        let product
        let promises = []
        let promises1 = []

        Cart.findAll({
            where: {
                UserId: req.decoded.id,
                checked_out: false
            },
            include: ['Product', 'User']
        })
        .then(response => {
            console.log("FIRST OFF: WHAT IS RESPONSE?");
            console.log(response);
            if(response.length > 0) {
                console.log("RETRIEVED ALL CARTS");
                carts = response
    
                carts.forEach(cart => {
                   
                    console.log(`FOR CART ${cart.id}, WE ARE WORKING ON PRODUCT ID ${cart.ProductId}`)
                    
                    // PROMISE FOR PRODUCT FIND
                    const promise = new Promise((resolve, reject) => {
                        console.log("VERIFYING PRODUCT STOCK FIRST");
                        Product.findOne({
                            where: {
                                id: cart.ProductId
                            }
                        })
                        .then(product => {
                            console.log("WHAT'S PRODUCT ?")
                            if(product) {
                                console.log("FOUND'EM")
                                if(product.stock >= cart.total_qty) {
                                    console.log("STOCKS ARE STILL PLENTIFUL")
                                    product.stock = Number(product.stock) - Number(cart.total_qty)
                                    resolve(product)
                                } else {
                                    console.log("INSUFFICIENT STOCK")
                                    disthrow = new customError(400, 'INSUFFICIENT STOCK')
                                    reject(disthrow)
                                }
                            } else {
                                console.log("PRODUCT NOT FOUND")
                                disthrow = new customError(404, 'ENTRY NOT FOUND')
                                reject(disthrow)
                            }
                        })
                        .catch(err => {
                            reject(err)
                        })
    
                    }) //ENND PROMISE CONST
                    promises.push(promise)
                })
    
                return Promise.all(promises)

            } else {
                throw new customError(404, 'ENTRY NOT FOUND')
            }

        }) 
        .then(response1 => {

            console.log("NOW BEGIN UPDATING STOCK");
            updated_product = response1

            let updatepromises = []

            response1.forEach(el => {

                console.log("ENTERING PROMISE OF PRODUCT?");
                const updprom = new Promise((resolve, reject) => {
                    console.log("NOW REALLY UPDATING PRODUCTS");
                    Product.update({
                        name: el.name,
                        category: el.category,
                        image_url: el.image_url,
                        price: el.price,
                        stock: el.stock
                    }, {
                        where: {
                            id: el.id
                        },
                        // attributes: { exclude: ['CartId'] },
                        returning: true
                    })
                    .then(updd => {
                        console.log("PRODUCT UPDATED");
                        console.log(updd[1]);
                        resolve(updd)
                    })
                    .catch(err => {
                        reject(err)
                    })
                })
                updatepromises.push(updprom)
            })
            return Promise.all(updatepromises)

        })
        .then(response2 => {

            console.log("WE ARE ABOUT TO UPDATE STATUS AT CART");

            let checkoutproms = []

            carts.forEach(el => {
                const checkoutprom = new Promise((resolve, reject) => {
                    Cart.update({
                        checked_out: true
                    }, {
                        where: {
                            id: el.id
                        },
                        include: ['Product', 'User'],
                        returning: true
                    })
                    .then(couted => {
                        console.log("CHECKED OUT");
                        resolve(couted[1][0].dataValues)
                    })
                    .catch(err => {
                        console.log("ERROR UPDATING");
                        reject(err)
                    })
                })

                checkoutproms.push(checkoutprom)
            })

            return Promise.all(checkoutproms)
        })
        .then(response3 => {
            console.log("CARTS CHECKDOUT. PRODUCTS' STOCKS UPDATED");
            res.status(201).json(response3)
        })
        .catch(err => {
            next(err)
        })
    }


}

module.exports = CartController