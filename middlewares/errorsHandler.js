module.exports = function (err, req, res, next) {
    let status;
    let message;
    let errors = []
    console.log( 'ini error handler')
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
        case 'authorization':
            status = 403
            errors = []
            errors.push(err.msg.message)
            message = {
                message: 'Bad Request',
                errors
            }
            break;
        case 'JsonWebTokenError':
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
            errors = []
            errors.push('internal server error')
            message = {
                message: 'internal server error',
                errors
            }
            break;
    }
    res.status(status).json(message)
}