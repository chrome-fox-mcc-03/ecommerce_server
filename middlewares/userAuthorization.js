const { Cart } = require('../models');
const notFound = "Cart Not Found!";
const unAuthorize = "You are unauthorize!";
const CustomError = require('../helpers/customError');

function authorization(req, res, next) {
    let userId = req.userId;
    let param = req.params.id;
    Cart.findOne({
        where: {
            id: param
        }
    })
        .then((result) => {
            if (result) {
                if (result.UserId == userId) {
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
