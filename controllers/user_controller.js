const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { validatePassword } = require('../helpers/bcrypt');

class UserController {
    static register(req, res, next) {        
        let { email, password } = req.body;

        User.create({
            email,
            password
        })
        .then(result => {
            
            let payload = {
                email,
                id: result.id
            }
            
            let token = generateToken(payload);
            res.status(201).json({ token });
        })
        .catch(error => {            
            next(error);
        })
    }

    static signIn(req, res, next) {
        let { email, password } = req.body;
        
        User.findOne({
            where: {
                email
            }
        })
        .then(result => {
            // console.log(result);
            if (!result) {
                next({
                    status: 404,
                    message: `wrong email/password`
                })
            } else {
                let isPasswordTrue = validatePassword(password, result.password)
                if (!isPasswordTrue) {
                    next({
                        status: 404,
                        message: `wrong email/password`
                    })
                } else {
                    let payload = {
                        email,
                        id: result.id
                    }
                    let token = generateToken(payload);
                    res.status(200).json({ token });
                }
            }
        })
    }
}

module.exports = UserController;