const { User } = require('../models/index')
const { getToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class Controller{
    static register(req, res, next) {
        const { email, password, name, role } = req.body
        if (email == undefined) {
            next({
                status: 400,
                message: {
                    error: 'Email is required'
                }
            })
        }
        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if(user) {
                    throw ({
                        status: 400,
                        message: {
                            error: 'Email already been used, try another email'
                        }
                    })
                } else {
                    return User.create({
                        email,
                        password,
                        name,
                        role
                    })
                }
            })
            .then(user => {
                const { id, name, email, role } = user
                const access_token = getToken({ id, name, email })
                res.status(201).json({ id, name, role, access_token })
            })
            .catch(err => next(err))
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (user && comparePassword(password, user.password)) {
                    const { id, name, email,role } = user
                    const access_token = getToken({ id, name, email })
                    res.status(200).json({ id, name, role, access_token })
                } else {
                    next({
                        status: 400,
                        message: {
                            error: 'Email or Password is wrong'
                        }
                    })
                }
            })
            .catch(err => next(err))
    }
}

module.exports = Controller