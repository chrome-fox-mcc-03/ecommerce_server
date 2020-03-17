const { Product } = require('../models')

class ProductController {
    static addProduct(req, res, next){
        const { name, image_url, price, stock } = req.body
        Product.create({
            name,
            image_url,
            price,
            stock
        })
        .then((productCreated) => {
            res.status(201).json({
                productCreated
            })
        })
        .catch((err) => {
            res.status(401).json({
                err
            })
        })
    }
    
    static fetchProduct(req, res, next){
        
    }
}


module.exports = {
    ProductController
}