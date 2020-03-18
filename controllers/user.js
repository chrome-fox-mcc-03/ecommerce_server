const { User } = require('../models');
const checkPass = require('../helpers/hashPassword');
const Jwt = require('../helpers/jwt');

class UserController {
    static register(req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
            .then(result => {
                const dataUser = {
                    id: result.id,
                    email: result.email
                }
                let token = Jwt.generateToken(dataUser)
                res.status(201).json({
                    id: result.id,
                    email: result.email,
                    token
                })
            })
            .catch(err => {                                
                next(err)
            })
    }

    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(result => {
                password = checkPass.comparePassword(password, result.password)
                if(password) {
                let token = Jwt.generateToken({
                    id: result.id,
                    email: result.email
                })
                    res.status(200).json({
                        token
                    })
                } else {
                    next({
                        name: "not found",
                        status: 404,
                        message: "Email or password is wrong"
                    })
                }
            })

            .catch(err => {
                next({
                    name: "not found",
                    status: 404,
                    message: "Your email address is not registered"
                })
            })
    }

    
}

module.exports = UserController