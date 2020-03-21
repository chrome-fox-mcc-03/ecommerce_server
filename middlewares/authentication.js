const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

module.exports = function (req, res, next) {
    try {
        req.decoded = verifyToken(req.headers.token)
        if (!req.headers.token){
            next({
                name: 'authentication',
                status: 403,
                msg: {
                    message: 'Forbidden'
                }
            })
        } else {
            User.findOne({
                    where: {
                        id: req.decoded.id,
                        email: req.decoded.email
                    }
                })
                .then(result => {
                    console.log(result, 'ini resuuult');
                    if (!result) {
                        next({
                            name: 'authentication',
                            status: 403,
                            msg: {
                                message: 'Forbidden'
                            }
                        })
                    } else {
                        next()
                    }
                })
                .catch(err => {
                    next({
                        name: 'authentication',
                        status: 403,
                        msg: {
                            message: 'Forbidden'
                        }
                    })
                })

        }
        
    } catch (err) {
       next({
           name: err.name,
           status: 403,
           msg: {
               message: 'Forbidden'
           }
       })
    }
}