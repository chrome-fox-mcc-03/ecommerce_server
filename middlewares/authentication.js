const { User } = require('../models');
const jwt = require('../helpers/jwt');
const CustomError = require('../helpers/customError');
const invalid = "invalid token!";

function authentication(req, res, next) {
    let token = req.headers.token;
    if (!token) {
        throw new CustomError(401, invalid);
    } else {
        try {
            let user = jwt.verify(token);
            console.log(user, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
            User.findByPk(user.id)
                .then((result) => {
                    if (result) {
                        req.userId = user.id;
                        req.role = user.role;
                        next();
                    } else {
                        throw new CustomError(401, invalid);
                    }
                }).catch((err) => {
                    next (new CustomError(401, invalid));
                });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = authentication;
