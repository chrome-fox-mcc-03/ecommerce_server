const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { getToken } = require('../helpers/jwt')

class UserController {
    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(response => {
                if(response) {
                    if(comparePassword(password, response.password)) {
                        let payload = {
                            id: response.id,
                            email: response.email
                        }
                        let token = getToken(payload)
                        res.status(200).json({ token })
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
            .catch(next)
    }
    static register(req, res, next) {
        let { email, password } = req.body
        User.create({
            email,
            password
        })
            .then(response => {
                let payload = {
                    id: response.id,
                    email: response.email
                }
                let token = getToken(payload)
                res.status(201).json({ token })
            })
            .catch(next)
    }
}

module.exports = UserController