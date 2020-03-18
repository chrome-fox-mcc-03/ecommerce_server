const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

module.exports = function (req, res, next) {
    try {
        req.decoded = verifyToken(req.headers.token)
        User.findOne({
            where:{
                id: req.decoded.id,
                email: req.decoded.email
            }
        })
            .then(result=>{
                next()
            })
            .catch(err=>{
                next({
                    name: 'authentication',
                    status: 403,
                    msg: {
                        message: 'Forbidden'
                    }
                })
            })
    } catch (err) {
        next({
            name: 'authentication',
            status: 403,
            msg: {
                message: 'Forbidden'
            }
        })
    }
}