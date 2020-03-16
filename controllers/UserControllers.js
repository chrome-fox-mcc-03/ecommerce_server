const { User } = require('../models')


class UserController {
    static register(req, res, next) {

        User.create({
            email,
            password
        })
        .then((userCreated) => {
            res.status(201).json({
                email : userCreated.email,
                id : userCreated.id
            })
        }).catch((err) => {
            next(err)
        });
    }

    static login(req, res, next){

        
    }

}

module.exports = {
    UserController
}