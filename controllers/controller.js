const { User } = require('./../models')

class Controller {
    static register(req, res, next){
        const { email, password } = req.body
        User.create({
            email,
            password
        })
            .then(user => {
                console.log(user)
                res.status(201).json(user)
            })
            .catch(err => {
                next(err)
            })

    }
}

module.exports = Controller