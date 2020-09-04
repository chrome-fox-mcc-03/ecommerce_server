const { verify } = require('../helper/jwt')
const { User } = require('../models')

function authenticationAdmin(req,res,next) {
    try{
        const token = req.headers.token
        const decoded = verify(token)
        if (decoded) {
            const email = decoded.email
            User.findOne({
                where: {
                    email
                }
            })
                .then(user => {
                    if (!user) {
                        const error = {
                            name: 'user not found'
                        }
                        throw error
                    } else {
                        console.log(decoded)
                        req.decoded = decoded
                        next() 
                    }
                })
                .catch(err => {
                    next(err)
                })
        } 
    }catch(err){
        next(err)
        // res.status(500).json(err)
    }
}

module.exports = authenticationAdmin