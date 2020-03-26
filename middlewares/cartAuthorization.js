const { Cart, CartItem } = require('../models/index');

module.exports = (req, res, next) => {
    let userId = req.decoded.id
    let CartItemId = req.params.id
    console.log(CartItemId, 'cartitem id')
    let error = {
        name: 'cartAuthorization',
        status: 403,
        msg: {
                message: 'Unauthorized'
            }
    }
    CartItem.findOne({
        where: {
            id: CartItemId
        }
    })
        .then(result => {
            return Cart.findOne({
                    where: {
                        id: result.CartId
                    }
                    })
        })
        .then( cartResult => {
            if (cartResult.UserId === userId) {
                next()
            } else {
                next(error)
            }
        })
        .catch( err => {
            next(error)
        })
}