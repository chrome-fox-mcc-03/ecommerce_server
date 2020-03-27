const { Cart } = require('../models')

function authorization (req, res, next) {
    console.log('masuk authorization')
    const UserId = req.user.UserId
    const CartId = Number(req.user.cartid)

    Cart.findOne({
        where: {
            id: CartId,
            UserId: UserId
        }
    })
        .then((result) => {
            if (result) {
                next()
            } else {
                let err = {
                    status : 401,
                    message : 'Authorization failed'
                }
                next(err)
            }
            return null
        })
        .catch((err) => {
            next(err)
        })
}


module.exports = authorization