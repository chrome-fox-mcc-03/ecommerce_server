const { Cart, Product } = require('../models')
const Sequelize = require('sequelize');
const { gt } = Sequelize.Op;


class CartController {
    static findAllActive (req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.decoded.id,
                isPaid: false,
                quantity: {
                    [gt]: 0
                }
            },
            include: [ Product ]
        })
            .then((response) => {
                res.status(200).json(response)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

}

module.exports = CartController