'use strict'

const { verifyToken } = require('../helpers/generateToken');
const { User } = require('../models')

class Authentication {

    static isAuthentic(req, res, next) {
        const token = req.headers.access_token;
        const decoded = verifyToken(token);
        const { id } = decoded

        try {
            User.findByPk(id).then(user => {
                if (user) {
                    req.loginId = user.id;
                    next()
                } else {
                    next({
                        status: 404,
                        message: 'Not Found'
                    })
                }
            });

        } catch (err) {
            next(err);
        }
    }
}

module.exports = { Authentication }