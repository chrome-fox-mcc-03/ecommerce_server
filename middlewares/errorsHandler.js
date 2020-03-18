module.exports = function (err, req, res, next) {
    let status;
    let message;
    let errors = []

    switch (err.name) {
        case 'SequelizeValidationError':
            errors = []
            err.errors.forEach(error => {
                errors.push(error.message)
            })
            status = 400
            message = {
                message: 'Bad Request',
                errors
            }
            break;
        case 'SequelizeUniqueConstraintError':
            errors = []
            err.errors.forEach(error => {
                errors.push('Email is already exists')
            })
            status = 400
            message = {
                message: 'Bad Request',
                errors
            }
            break;
        case 'loginValidation':
            status = 400
            errors = []
            errors.push(err.msg.message)
            message = {
                message: 'Bad Request',
                errors
            }
            break;
        case 'authentication':
            status = 403
            errors = []
            errors.push(err.msg.message)
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