const { User } = require('../models');
const notFound = "User Not Found!";
const unAuthorize = "You are unauthorize!";
const CustomError = require('../helpers/customError');

function authorization(req, res, next) {
    let userId = req.userId;

    User.findOne({
        where: {
            id: userId
        }
    })
        .then((result) => {
            if (result) {
                if (result.role == 1) {
                    next();
                } else {
                    throw new CustomError(401, unAuthorize)
                }
            } else {
                throw new CustomError(404, notFound)
            }
        }).catch((err) => {
            next(err);
        });
}

module.exports = authorization;
