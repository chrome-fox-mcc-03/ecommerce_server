const { User } = require('../models');
const { compareHash } = require('../helpers/bcrypt');
const { getToken, getPayload } = require('../helpers/jwt');
const appPayload = require('../helpers/appPayload');
const appError = require('../helpers/appError');

class UserController {
    static register (req, res, next) {
        // post /register
        let body = {
            email: req.body.email,
            password: req.body.password,
        }

        User.create(body)
            .then(result => {
                let data = {
                    id: result.id,
                    email: result.email,
                    access_token: getToken(appPayload(result)),
                }
                res.status(201).json(data);
            })
            .catch(next);
    }
    static login (req, res, next) {
        if (!req.body.email || !req.body.password) {
            next(appError(400, "email and password are required"));
        }
        let body = {
            email: req.body.email,
            password: req.body.password,
        }

        User.findOne({
            where: {
                email: body.email,
            }
        })
            .then(result => {
                if (result) {
                    if (compareHash(body.password, result.password)) {
                        let access_token = getToken(appPayload(result));
                        res.status(200).json({
                            access_token,
                            id: result.id,
                            email: result.email
                        })
                    } else {
                        next(appError(400, "wrong email/password combination"));
                    }
                } else {
                    next(appError(404, "wrong email/password combination"));
                }
            })
            .catch(next);
    }
    static userPayload (req, res, next) {
        // tej: belum testing
        const token = req.headers.token;
        if (!token) {
            next(appError(404, 'cannot find user from token'))
        } else {
            let payload = getPayload(token);
            if (!payload) {
                next(appError(404, 'cannot find user from token'))
            } else {
                payload = appPayload(payload);
                User.findOne({
                    where: {
                        email: payload.email
                    }
                })
                    .then(result => {
                        if (!result) {
                            next(appError(404, 'cannot find user from token'))
                        } else {
                            // tej: perbarui token jwt?
                            res.status(200).json({
                                access_token: token,
                                id: result.id,
                                email: result.email
                            })
                        }
                    })
                    .catch(next)
            }
        }
    }
};

module.exports = UserController;