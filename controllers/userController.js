const {
    User
} = require('../models/index')

const {
    checkPassword
} = require('../helpers/bcrypt')

const {
    tokenGenerate
} = require('../helpers/jwt')
class controller {
    static register(req, res, next) {
        let {
            email,
            password
        } = req.body
        User.create({
                email,
                password
            })
            .then(result => {
                res.status(201).json({
                    email: result.email,
                    id: result.id
                })
            })
            .catch(err => {
                next(err)
                // res.status(400).json(err.errors)
            })
    }

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
            .then(result => {
                let hashPassword = result.password
                let userCheck = checkPassword(password, hashPassword)
                if (userCheck) {
                    let payload = {
                        id: result.id,
                        email: result.email
                    }
                    let token = tokenGenerate(payload)
                    console.log(token);
                    res.status(201).json({
                        'token': token
                    })
                } else {
                    next({
                        status: 400,
                        msg: {
                            message: 'Email/Password is wrong'
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }

}

module.exports = controller