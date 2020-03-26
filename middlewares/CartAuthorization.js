const { Cart } = require('../models/index')

function authorization (req, res, next) {
    const id = req.params.id
    Cart.findOne({
        where: {
            id
        }
    })
        .then(cart => {
            if (cart) {
                if (cart.UserId == req.user.id) {
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
                        error: 'Cart not found'
                    }
                })
            }
        })
        .catch(err => next(err))
}

module.exports = authorization