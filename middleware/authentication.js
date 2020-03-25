const jwt = require('jsonwebtoken')
const { User } = require('../models')


function authentication(req, res, next){
    try {
        
        const access_token = req.headers.access_token
        console.log(access_token)
        const decoded = jwt.verify(access_token, process.env.SECRET)
        req.user = decoded
        console.log(req.user)

        if (decoded) {
            
            User.findOne({
                where: {
                    email: decoded.email
                }
            })
            .then((userFound) => {
                if(userFound){
                    next()
                }else {
                    const error = {
                        status : 401,
                        name : 'UserNotFound',
                        message : 'access denied'
                    }
                    throw error
                }
            })
            .catch(err => {
                next(err)
            })
        } else {
            const error = {
                status : 400,
                name : 'InvalidAccessToken',
                message : 'invalid access token'
            }
            throw error
        }
    } catch (error) {
        next(error)
    }
}


module.exports = authentication