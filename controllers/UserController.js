const { User } = require('../models');
const { compareHash } = require('../helpers/bcrypt');
const { getToken } = require('../helpers/jwt');
const appPayload = require('../helpers/appPayload');
const appError = require('../helpers/appError');

class UserController {
    static register (req, res, next) {
        // post /register
        // console.log("register route")
        let body = {
            email: req.body.email,
            password: req.body.password,
        }

        User.create(body)
        .then(result => {
            let data = {
                id: result.id,
                email: result.email,
            }
            res.status(201).json(data);
        })
        .catch(next);
    }
    static login (req, res, next) {
        console.log(req.body);
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
                        access_token
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
};

module.exports = UserController;