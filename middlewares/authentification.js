const {
    verify
} = require('../helpers/jwt')
const {
    User
} = require('../models')

module.exports = function (req, res, next) {
    let token = req.headers.token
    if (token) {
        try {
            req.decoded = verify(token)
            User.findOne({
                    where: {
                        email: req.decoded.email,
                        id: req.decoded.id,
                    }
                })
                .then(response => {
                    if (response) {
                        next()
                    } else {
                        next({
                            status: 401,
                            message: 'Please Login First!'
                        })
                    }
                })
                .catch(next)
        } catch (error) {
            next(error)
        }
    } else {
        next({
            status: 401,
            message: 'Please Login First!'
        })
    }
}