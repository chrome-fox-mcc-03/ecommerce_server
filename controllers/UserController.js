const {
    User,
    Cart
} = require('../models')
const {
    comparePassword
} = require('../helpers/bcrypt')
const {
    getToken
} = require('../helpers/jwt')

class UserController {
    static login(req, res, next) {
        let {
            email,
            password
        } = req.body
        User.findOne({
                where: {
                    email
                }
            })
            .then(response => {
                if (response) {
                    if (comparePassword(password, response.password)) {
                        return Cart.create({
                            UserId: response.id
                        })
                    } else {
                        next({
                            status: 401,
                            message: 'Email/Password invalid'
                        })
                    }
                } else {
                    next({
                        status: 401,
                        message: 'Email/Password invalid'
                    })
                }
            })
            .then(response => {
                let payload = {
                    id: response.UserId,
                    email,
                    role: false,
                    CartId: response.id
                }
                let token = getToken(payload)
                res.status(200).json({
                    token,
                    role: payload.role,
                    payload,
                    email,
                    CartId: response.id
                })
            })
            .catch(next)
    }
    static register(req, res, next) {
        let {
            email,
            password
        } = req.body
        User.create({
            email,
            password
        })
            .then(response => {
                return Cart.create({
                    UserId: response.id
                })
            })
            .then(response => {
                let payload = {
                    id: response.UserId,
                    email,
                    role: false,
                    CartId: response.id
                }
                let token = getToken(payload)
                res.status(201).json({
                    token,
                    role: payload.role,
                    payload,
                    email,
                    CartId: response.id
                })
            })
            .catch(next)
    }
}

module.exports = UserController