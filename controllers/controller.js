const { User } = require('./../models')
const { comparePass } = require('./../helper/bcrypt')
const { makeToken } = require('./../helper/jwt')

class Controller {
    static register(req, res, next){
        const { email, password } = req.body
        User.create({
            email,
            password
        })
            .then(user => {
                const payload = {
                    email: user.email,
                    id: user.id
                }
                console.log(user)
                res.status(201).json(payload)
            })
            .catch(err => {
                next(err)
            })

    }
    
    static login(req, res, next){
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(result => {
                if (!result) {
                    const error = {
                        name: "Invalid email/password"
                    }
                    throw error
                } else {
                    const compare = comparePass(password, result.password)
                    if (compare) {
                        const payload = {
                            id: result.id,
                            email: result.email
                        }
                        const token = makeToken(payload)
                        req.headers.token = token
                        res.status(200).json({ token })
                    } else {
                        const error = {
                            name: "Invalid email/password"
                        }
                        throw error
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller