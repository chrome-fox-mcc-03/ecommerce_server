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
        let {
            name,
            email,
            role,
            password
        } = req.body
        console.log(email, 'ini email reeeeeeg');
        console.log(password, 'ini passworrrrrd reeeeg');
        
        
        User.create({
            name,
                email,
                password,
                role
            })
            .then(result => {
                res.status(201).json({
                    email: result.email,
                    id: result.id
                })
            })
            .catch(err => {
                next(err)
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
        }).then(result => {
            let login = checkPassword(password, result.password)
            console.log(login, 'ini logiiiiiiiin');
            console.log(result);
            
            if (login) {
                let payload = {
                    id: result.id,
                    email: result.email
                }
                let token = tokenGenerate(payload)
                res.status(200).json({
                    'token': token
                })
            } else {
                let error = {
                    name: 'loginValidation',
                    status: 400,
                    msg: {
                        message: 'Email/Password is wrong'
                    }
                }
                throw error
            }
        }).catch(err => {
            next(err)
        })
    }
}

module.exports = controller