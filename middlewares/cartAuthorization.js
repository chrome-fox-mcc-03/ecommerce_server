const { Cart, CartItem } = require('../models/index');

module.exports = (req, res, next) => {
    let userId = req.decoded.id
    let CartItemId = req.params.id
    let error = {
        name: 'cartAuthorization',
        status: 403,
        msg: {
                message: 'Unauthorized'
            }
    }
    CartItem.findOne({ 
        include: [ Cart ]
    }, {
        where: {
            id: CartItemId
        }
    })
        .then(result => {
            if (result.Cart.UserId === userId) {
                next()
            } else {
                next(error)
            }
        })
        .catch(err => {
           next(error)
        })
}