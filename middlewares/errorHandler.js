const { Sequelize } = require('../models');

module.exports = function(err, req, res, next) {
    if (err instanceof Sequelize.ValidationError) {
        let errors = [];
        err.errors.forEach(item => {
            errors.push(item.message)
        })
        res.status(400).json({
            message: "bad request",
            errors: errors,
        })
    } else if (err instanceof Error) {
        res.status(err.code).json({
            error: err.message,
        })
    }
    else {
        res.status(500).json({
            error: "Internal Server Error",
        })
    }
}