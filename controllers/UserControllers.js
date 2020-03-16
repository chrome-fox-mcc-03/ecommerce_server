const { User } = require('../models')

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body
        User.create({
            email,
            password
        })
        .then((userCreated) => {
            // console.log(userCreated);
            
            res.status(201).json({
                "email" : userCreated.email,
                "id" : userCreated.id
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