'use strict'

class ErrorHandler {

    static errHandling(err, req, res, next) {

        // Error Token
        if (err.name === 'JsonWebTokenError') {
            err.status = 401;
            err.message = `Please login`;
        }

        // Error Sequelize Validation
        if (err.name === 'SequelizeValidationError') {
            err.status = 400;
            err.message = err.errors.map(each => each.message);
        }

        // Default Error Status 500
        res
            .status(err.status || 500)
            .json({ message: err.message || `Internal Server Error` });

    }
}

module.exports = { ErrorHandler }