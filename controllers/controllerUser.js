const { User } = require('./../models')
const { comparePass } = require('./../helper/bcrypt')
const { makeToken } = require('./../helper/jwt')

class ControllerUser {
    static register(req, res, next){
        const { email, password, name, role } = req.body
        User.create({
            email,
            password,
            name,
            role
        })
            .then(user => {
                const payload = {
                    email: user.email,
                    id: user.id,
                    name: user.name,
                    role: user.role
                }
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
                            email: result.email,
                            name: result.email,
                            role: result.role
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
                console.log(err)
                next(err)
            })
    }

    static update(req, res, next){
        const id = req.params.id
        const { email, password, name, role } = req.body
        User.update({
            email,
            password,
            name,
            role
        }, {
            where: {
                id
            },
            returning: true
        })
            .then(response => {
                console.log(response)
                if (response[1].length === 0) {
                    const error = {
                        name: 'user not found'
                    }
                    throw error
                } else {
                    const user = response[1][0]
                    const payload = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    }
                    res.status(200).json(payload)
                }
            })
            .catch(err => {
                console.log('called in catch')
                next(err)
            })
    }

    static delete(req,res,next){
        const id = req.params.id
        let user
        User.findByPk(id)
            .then(response => {
                if (!response) {
                    const error = {
                        name: "user not found"
                    }
                    throw error
                } else {
                    user = response
                    return User.destroy({
                        where: {
                            id
                        }
                    })
                }
            })
            .then(result => {
                res.status(203).json(user)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControllerUser