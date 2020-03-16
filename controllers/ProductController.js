const { Product } = require('../models') ;

class ProductController {
    static findAll (req,res,next) {
        Product.findAll()
            .then((products)=> {
                res.status(200).json({
                    data: products
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    static create ( req, res, next) {
        
    }


}

module.exports = ProductController