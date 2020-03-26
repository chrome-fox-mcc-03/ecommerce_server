const { Product, UserProduct } = require('../models/index.js')
const { verifyToken } = require('../helpers/jwt.js')

function authorization(req, res, next) {
    const token = req.headers.token
    let user = verifyToken(token)
    UserProduct.findOne({where: {id: req.params.id}})
        .then(purchase => {
            if(purchase.UserId === user.id) return next()
            else throw {status: 400, customName: 'You do not have access to this item, check again.'}
        })
        .catch(err => next(err))
}

module.exports = authorization;