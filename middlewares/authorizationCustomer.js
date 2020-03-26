const { Cart } = require('../models')

module.exports = (req, res, next) => {
    Cart.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(cart => {
            if(cart.UserId === req.decoded.id){
                next()
            } else {
                next({
                    status: 401,
                    message: 'You are not authorized'
                })
            }
        })
        .catch(err => {
            next(err)
        })
}