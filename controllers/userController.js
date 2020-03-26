const { User } = require('../models/index')
const { createToken } = require('../helpers/jwt')
const { matchPassword } = require('../helpers/bcrypt')

class Controller {
    static register(req, res, next) {
        // console.log('ha')
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(user => {
                // console.log('tercipta')
                let payload = {
                    id: user.id,
                    email: user.email
                }
                let token = createToken(payload)
                payload.token = token
                // console.log(token)
                return res.status(201).json(payload)
            })
            .catch(err => {
                return next(err)
            })
    }
    static login(req, res, next) {
        let loginUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where: {email: loginUser.email}})
            .then(user => {
                if(!user) {
                    throw {customMessage: "Email/password does not match"}
                } else if(!matchPassword(loginUser.password, user.password)) {
                    throw {customMessage: "Email/password does not match"}
                } else {
                    let payload = {
                        id: user.id,
                        email: user.email
                    }
                    let token = createToken(payload)
                    return res.status(201).json({token: token})
                }
            })
            .catch(err => next(err))
    }
}
module.exports = Controller