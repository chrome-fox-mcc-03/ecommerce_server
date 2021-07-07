const { Sequelize } = require('../models');

function errorHandler(err, req, res, next) {
    // console.log(err instanceof Sequelize.ValidationError);
    console.log("MASUK ERROR ");
    console.log(err);
    if (err instanceof Sequelize.ValidationError) {
        let arr = [];
        err.errors.forEach(item => {
            arr.push(item.message)
        })
        res.status(400).json({
            message: "BAD REQUEST",
            errors: arr,
        })
    } else if (err instanceof Error) {
        res.status(err.code).json({
            errors: [err.message],
        })
    }
    else {
        res.status(500).json({
            errors: ["INTERNAL SERVER ERROR"],
        })
    }
}
module.exports = errorHandler