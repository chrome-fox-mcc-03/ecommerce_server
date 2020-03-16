const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwtoken')
class UserController {
    static register(req, res, next) {
        const { email, password } = req.body
        User.create({
            email,
            password
        })
        .then((userCreated) => {
            // console.log(userCreated);
            
            res.status(201).json({
                "email" : userCreated.email,
                "id" : userCreated.id
            })
        }).catch((err) => {
            next(err)
        });
    }

    static login(req, res, next){
        const { email } = req.body
        // console.log(email, 'from controller');
        
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
                    // console.log(access_token, "<<<<<");

                    res.status(200).json({
                        access_token
                    })
                } else {
                    const error = {
                        status : 401,
                        message : 'email / password is incorrect'
                    }

                    throw error
                }

            } else {
                const error = {
                    status : 401,
                    message : 'user not found'
                }

                throw error
            }
            
        }).catch((err) => {
            next(err)
        });
    }

}

module.exports = {
    UserController
}