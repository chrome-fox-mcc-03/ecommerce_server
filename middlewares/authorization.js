const { Product } = require('../models')

module.exports = function(req, res, next) {
    console.log(req.params);
    Product.findOne({
        where: {
            id: +req.params.id
        }
    })
        .then(product => {
            if(product) {
                if(product.UserId === req.decoded.id && req.decoded.role === true) {
                    next()
                } else {
                    next({
                        status: 401,
                        message: 'You dont have authorization'
                    })
                }
            } else {
                next({
                    status: 404,
                    message: 'Product not found'
                })
            }
        })
        .catch(next)
}