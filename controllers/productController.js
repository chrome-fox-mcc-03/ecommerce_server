const {Product} = require('../models')
class ProductController {
    static addProduct(req,res,next) {
        let {name,image_url,price,stock} = req.body
        Product.create({
            name,
            image_url,
            price,
            stock
        })
        .then((result) => {
            res.status(201).json({name,image_url,price,stock})  
        }).catch((err) => {
            next(err)
        });
    }

    static getProductById(req,res,next) {
        const {id} = req.params
        Product.findOne({
            where: { id }
        })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            next(err)
        })
    }

    static getProduct(req,res,next) {
        Product.findAll({
            order: [
                ['id','ASC']
            ]
        })
        .then((result) => {
            res.status(200).json({result})    
        }).catch((err) => {
            next(err)
        });
    }

    static updateProduct(req,res,next) {
        let {id} = req.params
        let {name,image_url,price,stock} = req.body
        Product.update({
            name,
            image_url,
            price,
            stock
           
        },{where:{id}})
        .then((result) => {
            res.status(200).json({name,image_url,price,stock})   
        }).catch((err) => {
            next(err)
        });
    }

    static deleteProduct(req,res,next) {
        let {id} = req.params
        Product.destroy({
            where:{id}
        })
        .then((result) => {
            res.status(200).json({message:'Success Delete'})   
        }).catch((err) => {
            next(err)
        });
    }
}

module.exports = ProductController