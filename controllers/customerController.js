const {
    User
} = require('../models')

const {
    checkPassword
} = require('../helpers/bcrypt')

const {
    tokenGenerate
} = require('../helpers/jwt')


class controller {
    static register(req, res, next) {
        let {name, email, password} = req.body
        User.create({
            name,
            email,
            password,
            role: 'Customer'
        })
        .then( result =>{
            let payload = {
                id: result.id,
                email: result.email,
                name: result.name
            }
            res.status(201).json(payload)
        })
        .catch( err => {
            next(err)
        })
    }

    static login(req, res, next) {
        let error = {
            name: 'loginValidation',
            status: 400,
            msg: {
                message: 'Email/Password is wrong'
            }
        }
        let {email, password} = req.body
        User.findOne({
            where: {
                email: email
            }
        })
        .then( result => {
            let loginCheck = checkPassword(password, result.password)
            if(loginCheck) {
                let payload = {
                    id: result.id,
                    email: result.email
                }
                let token= tokenGenerate(payload)
                res.status(200).json({
                    token: token,
                    name: result.name
                })
            } else {
                next(error)
            }
        })
        .catch(_ => {
            next(error)
        })


    }

}


module.exports = controller