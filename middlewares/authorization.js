const { Product } = require('../models');

module.exports = (req, res, next) => {
    let data = req.decoded
    Product.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        if(result.UserId = data.id) {
            next()
        } else {
            next({
                status: 401,
                msg: `unauthorized access`
            })
        }
    })
    .catch(error => {
        next({
            status: 401,
            msg: `unauthorized access`
        })
    })
}