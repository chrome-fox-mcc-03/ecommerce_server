const { Product } = require('../models') ;

module.exports = function (req, res, next) {
    const role = req.decoded.role;
    
    if (role == 'admin') {
        next()
    } else {
        let err = {
            name : 'custom',
            status : 401,
            message : 'You are not authorized'
        }
        next(err)
    }
}