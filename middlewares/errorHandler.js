module.exports = function (err, req, res, next) {
    console.log(err.name);
    let status = 500 ;
    let message = {message : 'Internal Server Error'};
    switch (err.name) {
        case 'SequelizeValidationError' :
            const errors = []
            err.errors.forEach(element => {
                errors.push(element.message)
            });
            message = {
                message : 'Bad Request',
                errors : errors
            }
            status = 400 ;
            res.status(status).json(message)
        break ;
        default :
            res.status(status).json(message)
        break ;
    }
}