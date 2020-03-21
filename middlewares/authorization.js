const { User } = require('../models/index');

module.exports = (req, res, next) => {
    let userId = req.decoded.id

    User.findOne({
        where: {
            id: userId
        }
    })
        .then(res => {
            if (res.role === 'Super Admin'){
                next()
            } else {
                next({
                    name: 'authorization',
                        status: 403,
                        msg: {
                            message: 'Unauthorized, only Super Admin can do this action!'
                        }
                })
            }
        })
        .catch(err => {
            next(err)
        })
}