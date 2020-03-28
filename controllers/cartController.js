const {Cart,User,Product} = require('../models')
const Helper = require('../helpers/helper')
class CartController {
    static getCartByUserId (req,res,next) {
        const {token} = req.headers
        const decoded = Helper.decodedToken(token)
        const UserId = decoded.id
        Cart.findAll({
            where: {UserId},
            include: [User,Product]
        })
        .then((result) => {
            res.status(200).json(result)    
        }).catch((err) => {
            next(err)
        });
    }

    static addCart (req,res,next) {
        // userId ambil dari token aja
        const {token} = req.headers
        let decoded = Helper.decodedToken(token)
        const UserId = decoded.id
        const {quantity,ProductId} = req.body
        Cart.findOne({
            where:{
                UserId,
                ProductId
            }
        })
        .then((result) => {
            console.log(result)
            if(result) {
                let quantityDb = result.dataValues.quantity
                quantityDb += quantity
                return Cart.update({
                    quantity:quantityDb,
                    paid:false,
                    UserId,
                    ProductId
                },{where: {id:result.dataValues.id}})
            } else {
                return Cart.create({
                    quantity,
                    paid:false,
                    UserId,
                    ProductId
                })
            }
        })
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            next(err)
        });
    }

    static deleteCart (req,res,next) {
        const {id} = req.params
        Cart.destroy({
            where: {id}
        })
        .then((result) => {
            if(result) {
                res.status(200).json({
                    status: 200,
                    message: 'Success Delete'
                })
            } else {
                next({
                    status: 404,
                    message: 'Data Not Found'
                })
            } 
        }).catch((err) => {
           next(err)
        });
    }
}

module.exports = CartController