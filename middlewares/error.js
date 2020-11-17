module.exports = (err, req, res, next) => {
    if (err.name == "SequelizeUniqueConstraintError") {
        err.errors.forEach(el => {
            // let message = [];
            // message.push(el)
            res.status(400).json(el);
        });
    } else if (err.name == "SequelizeValidationError") {
        err.errors.forEach(el => {
            // let message = [];
            // message.push(el)            
            res.status(400).json(el);
            // console.log(res.status);
            
        });
    } else {
        res.status(err.status).json(err.message);
    }
}