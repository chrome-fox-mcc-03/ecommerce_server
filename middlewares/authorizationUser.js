const { Cart } = require('../models')


module.exports = function (req, res, next) {
    const UserId = req.decoded.id
    const CartId = req.params.id

    Cart.findOne({
        where: {
            id: CartId,
            UserId: UserId
        }
    })
        .then((response) => {
            if (response) {
                next()
            } else {
                let err = {
                    name : 'custom',
                    status : 401,
                    message : 'You are not authorized'
                }
                next(err)
            }
        })
        .catch((err) => {
            next(err)
        })
}