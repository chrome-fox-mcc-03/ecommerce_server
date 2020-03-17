const { Product } = require('../models')

class ProductController {
    static addProduct(req, res, next){
        const { name, image_url, price, stock }
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
}


module.exports = {
    ProductController
}