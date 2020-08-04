const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { decryptPassword } = require('../helpers/bcrypt')

class UserController {
    static register(req, res, next) {
        let input = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'customer'
        }

        User.create(input)
            .then(result => {
                const payload = {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    role: result.role
                }

                const access_token = generateToken(payload)

                const data = {
                    access_token,
                    user: payload
                }
                res.status(201).json({msg:'User created!', data})
            })

            .catch(next)
    }
    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({ where: { email } })
            .then(result => {
                if (result) {
                    const isLogin = decryptPassword(password, result.password)

                    if (isLogin) {
                        const payload = {
                            id: result.id,
                            email: result.email,
                            name: result.name,
                            role: result.role
                        }
                        const access_token = generateToken(payload)
                        res.status(200).json({ access_token, user: payload })
                    } else {
                        next({ message: 'email/password wrong' })
                    }
                } else {
                    next({ message: 'email/password wrong' })
                }
            })
            .catch(next)
    }
}

module.exports = UserController