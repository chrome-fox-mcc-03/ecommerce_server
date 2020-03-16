const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');

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

    static signIn(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {

                if (user) {
                    let passwordMatched = comparePassword(req.body.password, user.password);
                    console.log(passwordMatched);
                    console.log(req.body.password);
                    console.log(user.password);

                    if (passwordMatched) {

                        const payload = { id: user.id, name: user.name, email: user.email };
                        const token = generateToken(payload);
                        res.status(200).json({ token, currentUser: user.name });
                    } else {
                        next({
                            status: 400,
                            message: 'Invalid email/password'
                        })
                    }
                } else {
                    next({
                        status: 400,
                        message: 'Invalid email/password'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static signInAdmin(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (user) {
                    console.log(user);
                    
                    let passwordMatched = comparePassword(req.body.password, user.password);
                    console.log(passwordMatched);
                    if (passwordMatched) {
                        if (user.is_admin) {
                            const payload = { id: user.id, name: user.name, email: user.email };
                            const token = generateToken(payload);
                            res.status(200).json({ token });
                        } else {
                            next({
                                status: 400,
                                message: 'Admin only! No trespassing!'
                            })
                        }
                    } else {
                        next({
                            status: 400,
                            message: 'Invalid email/password'
                        })
                    }
                } else {
                    next({
                        status: 400,
                        message: 'Invalid email/password'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController;