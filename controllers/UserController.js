const { User } = require ('../models/index') ;
const { getToken } = require('../helpers/jwt') ;
const { checkPassword } = require('../helpers/bcrypt') ;

class UserController {
    static register (req,res,next) {

        let newUser = {
            email : req.body.email,
            password : req.body.password,
        }

        if (!req.body.role) {
            newUser.role = 'customer'
        } else {
            newUser.role = req.body.role
        }

        User.create(newUser)
            .then((data)=>{
                let payload = {
                    id : data.id,
                    email : data.email,
                    role : data.role
                }

                let token = getToken(payload) ;

                res.status(201).json({
                    token : token
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    error: err
                })
                // next(err)
            })
    }

    static login (req,res,next){
        let loginUser = {
            email : req.body.email,
            password : req.body.password
        }

        User.findOne({
            where : {
                email : loginUser.email
            }
        })
            .then ((found)=> {
                if (found) {
                    let checkPW = checkPassword(loginUser.password , found.password)

                    if(checkPW) {
                        let payload = {
                            id : found.id,
                            email : found.email,
                            role : found.role
                        }
        
                        let token = getToken(payload) ;
        
                        res.status(200).json({
                            token : token
                        })
                    } else {
                        let err = {
                            name : 'custom',
                            status : 400,
                            message : 'Wrong email/password'
                        }
                        next(err)
                    }
                } else {
                    let err = {
                        name : 'custom',
                        status : 400,
                        message : 'Wrong email/password'
                    }
                    next(err)
                }
            })

            .catch((err)=>{
                next(err);
            })
    }

}

module.exports = UserController