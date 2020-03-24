const { User, Cart } = require('../models/index');

function adminAuth(req, res, next) {
    console.log(['Current User: '], req.currentUserId);
    User.findOne({
        where: {
            id: req.currentUserId
        }
    })
        .then(user => {
            console.log('### The User ==> ', user);
            if (user.is_admin) {
                next()
            } else {
                res.status(401).json({ status: 401, message: "Authorization failed" })
            }
        })
        .catch(err => {
            console.log('errorrrrr disini');
            res.status(500).json(err)
        })
}

function customerAuth(req, res, next) {
    Cart.findOne({
        where: {
            id: req.params.cartId
        }
    })
        .then(cart => {
            if (cart) {
                if (cart.UserId == req.currentUserId) {
                    next()
                } else {
                    res.status(401).json({ status: 401, message: "Authorization failed" })
                }
            } else {
                res.status(401).json({ status: 404, message: "Cart not found" })
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = {
    adminAuth,
    customerAuth
}