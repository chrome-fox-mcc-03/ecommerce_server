const { Product } = require('../models')

module.exports = function(req, res, next) {
    Product.findOne({
        where: {
            id: +req.params.id
        }
    })
        .then(product => {
            if(product) {
                if(req.decoded.role === true) {
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