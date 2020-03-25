const { Cart, Product, User, sequelize } = require('../models')
const { customError } = require("../helpers/errorModel")
let inputParams
let itemId
let UserId
let ProductId
let item

class CartController {

    // static createCart(req, res, next, item) {
    //     console.log(">>> CONTROLLERS: CREATECART");
    //     console.log("ITEM OF CONCERN IS");
    //     console.log(item);

    //     Cart.create({
    //         UserId: req.decoded.id,
    //         ProductId: item.id,
    //         totalQty: 1,
    //         totalPrice: item.price
    //     })

    // }

    // static add2Cart(req, res, next) {
    //     itemId = req.params.productId

    //     // FIRST, CHECK WHETHER AN DAT ITEM STILL HAS SUPPLY
    //     Product.findOne({
    //         where: {
    //             id: itemId
    //         } ,
    //         attributes: { exclude: ['CartId', 'UserId'] }
    //     })
    //     .then(response => {
    //         console.log("ITEM RECOVERED");
    //         // console.log(response);
    //         console.log(response.dataValues);
    //         item = response.dataValues

    //         if(item.stock > 0) {
    //             console.log("ITEM IN STOCK");

    //             // CHECK IF (ACTIVE) CART EXIST YET
    //             return Cart.findOne({
    //                 where: {
    //                     UserId: req.decoded.id,
    //                     ProductId: item.id,
    //                     status: "pending"
    //                 }
    //             })
    //         } else {
    //             throw new customError(400, "ITEM SOLD OUT")
    //         }
            
    //     })
    //     .then(response1 => {
    //         console.log("ANY CART?");
    //         console.log(response1);

    //         // CREATE CART IF NULL
    //         if(response1) {
    //             Product.update({

    //             })
    //         }
    //         // if(!response1) {
    //         //     Cart.create({
    //         //         UserId: req.decoded.id,
    //         //         ProductId: itemId,
    //         //         totalQty: 1,
    //         //         totalPrice: item.price,
    //         //         status: "pending",
    //         //         include: [
    //         //             {model: User},
    //         //             {model: Product}
    //         //         ]
    //         //     })
    //         //     .then(_ => {

    //         //         console.log("CART CREATED");
    //         //         // console.log(response1a);
    //         //         console.log("ITEM IS");
    //         //         console.log(item);
    //         //         return Product.update({
    //         //             stock: --item.stock
    //         //         },{
    //         //             where: {
    //         //                 id: item.id
    //         //             },
    //         //             include: [
    //         //                 {model: User},
    //         //                 {model: Cart}
    //         //             ],
    //         //             returning: true
    //         //         })
    //         //     })
    //         //     .then(_ => {
    //         //         console.log("PRODUCT UPDATED");
    //         //         console.log(response1b[0]);
    //         //     })
    //         // }
    //     })
    //     .catch(err => {
    //         next(err)
    //     })

    
       
    // }

    static showAll(req, res, next) {
        console.log("SHOWING ALL CARTS");
        Cart.findAll({
            where: {
                UserId: req.decoded.id
            }
        })
        .then(response => {
            console.log("CARTS RETRIEVED");
            // console.log(response);
            res.status(200).json({response})
        })
        .catch(err => {
            next(err)
        })
    }


    static createCart(req, res, next) {
        console.log(">>> CONTROLLERS: CREATE CART \n");
        UserId = req.decoded.id
        itemId = req.body.id

        Cart.findOne({
            where: {
                UserId: UserId,
                ProductId: itemId
            }
        })
        .then(response => {
            console.log("CART IS");
            console.log(response);
            if(response) {
                console.log("HAVE CART!");
                throw new customError(400, "CART EXISTED. TRY TO UPDATE INSTEAD.")
            } else {
                console.log("NOT YET! LET'S CREATE NEW ONE");
                Cart.create({
                    UserId: UserId,
                    ProductId: itemId,
                    totalQty: 1,
                    totalPrice: req.body.price,
                    status: "pending",
                    include: [
                        {model: User},
                        {model: Product}
                    ]
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


    static add2Cart(req, res, next) {
        console.log(">>> CONTROLLERS: ADD ITEM TO CART \n");
        Cart.update({
            totalQty: sequelize.literal('totalQty + 1'),
            totalPrice: sequelize.literal('(totalQty/(totalQty-1))*totalPrice')
        }, {
            where: {
                id: req.params.cartId
            },
            returning: true
        })
        .then(response => {
            console.log("CART UPDATED: QTY ADD");
            let updated = response[0]
            res.status(201).json({updated})
        })
        .catch(err => {
            next(err)
        })
    }


    static removeFromCart(req, res, next) {
        console.log(">>> CONTROLLERS: ADD ITEM TO CART \n");
        Cart.update({
            totalQty: sequelize.literal('totalQty - 1'),
            totalPrice: sequelize.literal('(totalQty/(totalQty+1))*totalPrice')
        }, {
            where: {
                id: req.params.cartId
            },
            returning: true
        })
        .then(response => {
            console.log("CART UPDATED: QTY MINUS");
            let updated = response[0]
            res.status(201).json({updated})
        })
        .catch(err => {
            next(err)
        })
    }


    // static deleteCart(req, res, next) {}    
    
}

module.exports = CartController