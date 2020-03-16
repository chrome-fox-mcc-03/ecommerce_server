const { User } = require('./../models')

class ControllerUser {
    static getAllUser(req, res, next){
        User.findAll()
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static getById(req,res,next){
        const id = req.params.id
        User.findByPk(id)
            .then(response => {
                if (!response) {
                    const error = {
                        name: 'user not found'
                    }
                    throw error
                } else {
                    res.status(200).json(response)
                }
            })
            .catch(err => {
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
                const user = response[1][0]
                const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
                res.status(200).json(payload)
            })
            .catch(err => {
                res.status(400).json(err)
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
                res.status(400).json(err)
            })
    }
}

module.exports = ControllerUser