const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static signUp(req, res, next) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then(newUser => {
                const payload = { id: newUser.id, name: newUser.name, email: newUser.email };
                const token = generateToken(payload);
                res.status(201).json({ token, currentUser: newUser.name });
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController;