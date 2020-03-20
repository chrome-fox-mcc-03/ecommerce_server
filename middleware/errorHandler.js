
const { Sequelize } = require('../models');

module.exports = function(err, req, res, next) {
    // console.log(err instanceof Sequelize.ValidationError);
    console.log("MASUK ERROR ");
    // console.log(err);
    // console.log(err);
    if (err instanceof Sequelize.ValidationError) {
        let errors = [];
        err.errors.forEach(item => {
            errors.push(item.message)
        })
        res.status(400).json({
            message: "BAD REQUEST",
            error: errors,
        })
    } else if (err instanceof Error) {
        res.status(err.code).json({
            error: err.message,
        })
    }
    else {
        res.status(500).json({
            error: "INTERNAL SERVER ERROR",
        })
    }
}