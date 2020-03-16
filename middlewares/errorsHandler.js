module.exports = function (err, req, res, next) {
    let status;
    let message;

    switch (err.name) {
        case 'SequelizeValidationError':
            const errors = []
            err.errors.forEach(error => {
                errors.push(error.message)
            })
            status = 400
            message = {
                message: 'Bad Request',
                errors
            }
            break;
        default:
            status = 500
            message = {
                message: 'internal server error'
            }
            break;
    }
    res.status(status).json(message)
}