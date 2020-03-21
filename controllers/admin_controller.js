const { User } = require('../models');
const { validatePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class AdminController {
    static login(req, res, next) {
        let { email, password } = req.body;
        User.findOne({
            where: {
                email
            }
        })
        .then(result => {
            
            if(!result) {
                next({
                    status: 404,
                    message: `wrong email/password`
                })
            } else {
                let isPasswordTrue = validatePassword(password, result.password);
                
                if(!isPasswordTrue) {
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

module.exports = AdminController;