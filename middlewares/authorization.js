const { Product } = require('../models/index')

function authorization (req, res, next) {
    const id = req.params.id
    Product.findOne({
        where: {
            id
        }
    })
        .then(product => {
            if (product) {
                if (product.AdminId == req.user.id) {
                    next()
                } else {
                    next({
                        status: 401,
                        message: {
                            error: 'You do not have authorize to do this'
                        }
                    })
                }
            } else {
                next({
                    status: 404,
                    message: {
                        error: 'Product not found'
                    }
                })
            }
        })
        .catch(err => next(err))
}

module.exports = authorization