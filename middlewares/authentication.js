const { User } = require('../models/index.js')
const { verifyToken } = require('../helpers/jwt.js')

function authenticationAdmin(req, res, next) {
    // res.status(200).json('Masuk')
    // console.log(req.headers)
    const token = req.headers.token
    try {
        req.decoded = verifyToken(token);
        console.log(req.decoded)
        // if(req.decoded.email == 'admin@ecommerce.com')
        User.findOne({ where: { email: req.decoded.email } })
            .then(exists => {
                if(exists.role === 'admin') {
                    console.log("mantap")
                    return next()
                }
                else {
                    throw { customMessage: 'User is not admin' }
                }
            })
            .catch(err => next(err))
    } catch(err) {
        // err
        console.log(err)
        throw err
    }
}

function authenticationUser(req, res, next) {
    // res.status(200).json('Masuk')
    // console.log(req.headers)
    const token = req.headers.token
    try {
        req.decoded = verifyToken(token);
        console.log(req.decoded)
        // if(req.decoded.email == 'admin@ecommerce.com')
        User.findOne({ where: { email: req.decoded.email } })
            .then(exists => {
                if(exists) {
                    console.log("mantap")
                    return next()
                }
                else {
                    throw { customMessage: 'User is not found' }
                }
            })
            .catch(err => next(err))
    } catch(err) {
        // err
        console.log(err)
        throw err
    }
}


module.exports = { authenticationAdmin, authenticationUser }