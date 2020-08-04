const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

function authentication (req, res, next) {
    try {
        const { token } = req.headers
        req.decoded = verifyToken(token)
        User.findOne({
            where: {
                email: req.decoded.email
            }
        })
            .then(user => {
                if (user) {
                    req.user = user.dataValues
                    next()
                } else {
                    next({
                        status: 401,
                        message: {
                            error: 'Please Login First'
                        }
                    })
                }
            })
    } catch (err) {
        next(err)
    }
}

module.exports = authentication