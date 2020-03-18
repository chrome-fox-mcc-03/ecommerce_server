const { User } = require('../models');

function authorization(req,res,next) {
    try {
    User.findOne({
        where: {
            email: req.UserEmail
        }
    })
        .then(user => {
            if(user.role === "admin"){
                next()
            } else {                
                next({
                    status: 401,
                    message: "You are not authorized"
                })
            }
        })
        .catch(err => {
            next({
                status: 401,
                message: "unauthorized"
            })
        })
        
    } catch(err) {
        next({
            status: 401,
            message: "unauthorized"
        })
    }
}

module.exports = authorization