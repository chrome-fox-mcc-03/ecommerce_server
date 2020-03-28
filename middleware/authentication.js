const jwt = require('jsonwebtoken')
const { User, Cart } = require('../models')


function authentication(req, res, next){
    try {
        
        const access_token = req.headers.access_token
        // console.log(access_token, 'authentication')
        const decoded = jwt.verify(access_token, process.env.SECRET)
        // console.log(req.user, 'authentication')

        if (decoded) {
            
            User.findOne({
                where: {
                    email: decoded.email
                }
            })
            .then((userFound) => {
                if(userFound){
                    return Cart.findOne({
                        where: {
                            UserId : userFound.dataValues.id
                        }
                    })
                }else {
                    const error = {
                        status : 401,
                        name : 'UserNotFound',
                        message : 'access denied'
                    }
                    throw error
                }
            })
            .then((result) => {
                if(result){
                    console.log(result)
                    req.user = {
                        UserId : result.dataValues.UserId,
                        cartid: result.dataValues.id
                    }
                    next()
                }else{
                    // console.log('Cart gak ada')
                    const error = {
                        status : 401,
                        name : 'CartNotFound',
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