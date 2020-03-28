const { User, Cart } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwtoken')
class UserController {
    static register(req, res, next) {
        let role =''
        if(req.params.email){
            role = 'customer'
        } else {
            role = 'admin'
        }
        const { email, password } = req.body
        
        User.create({
            email,
            password,
            role
        })
            .then((userCreated) => {
                return Cart.create({
                    UserId: userCreated.id
                })
            })
            .then((result) => {
                res.status(201).json({
                    result
                })
            })
            .catch((err) => {
                next(err)
            });
    }


    static login(req, res, next){
        const { email } = req.body
        User.findOne({
            where: {
                email
            }
        })
        .then((userFound) => {
            if(userFound){
                const password = req.body.password
                const payload = {
                    id: userFound.id,
                    email: userFound.email
                }
                
                const checkPassValidity = comparePassword(password, userFound.password)
                
                if(checkPassValidity){

                    const access_token = signToken(payload)
                    req.headers.access_token = access_token

                    res.status(200).json({
                        access_token
                    })
                } else {
                    const err = {
                        status : 401,
                        name : 'ErrorPassword',
                        message : 'email / password is incorrect'
                    }

                    next(err)
                }

            } else {
                const err = {
                    status : 401,
                    name : 'UserNotFound',
                    message : 'email / password is incorrect'
                }

                throw err
            }
            
        }).catch((err) => {
            
            next(err)
        });
    }

}

module.exports = {
    UserController
}