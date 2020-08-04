'use strict'

const { User, Cart, Product } = require('../models');

class Authorization {

    static isAdminAuthorized(req, res, next) {
        User.findByPk(id).then(user => {
            const id = req.loginId;
            if (user.role === 'admin') {
                next()
            } else {
                next({
                    status: 401,
                    message: `You are not authorized!`
                })
            }
        }).catch(next)
    };

    static isCustomerAuthorized(req, res, next) {
        const id = req.loginId;
        const { ProductId } = req.body;
        const CartId = +req.params.id;

        Cart.findByPk(CartId).then(cart => {
            if (cart.UserId === id && cart.ProductId === +ProductId) {
                next();
            } else {
                next({
                    status: 404,
                    message: `Not Found`
                })
            }
        }).catch(next);
    }

}

module.exports = { Authorization }