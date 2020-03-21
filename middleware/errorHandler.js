function errorHandler(err, req, res, next){
    // console.log(err, 'err name here');
    
    let status = 500
    let message = { message : `internal server error` }
    const errors = []
    switch (err.name) {
        case 'SequelizeValidationError':
            // errors = []
            err.errors.forEach(element => {
                errors.push(element.message)
            });
            message = {
                message : 'Bad Request',
                errors
            }
            status = 400
            res.status(status).json(message)
            break;
        case 'UniqueConstraintError':
            // const errors = []
            err.errors.forEach(element => {
                errors.push(element.message)
            });
            message = {
                message : 'Bad Request',
                errors
            }
            status = 401
            res.status(status).json(message)
            break;
        case 'UserNotFound':
            errors.push(err.message)
            message = {
                message : 'email / password is incorrect',
                errors
            }
            status = 401
            res.status(status).json(message)
            break;
        case 'ErrorPassword':
            errors.push(err.message)
            message = {
                message : 'email / password is incorrect',
                errors
            }
            status = 401
            res.status(status).json(message)
        default:
            // console.log(err, 'default here');
            res.status(status).json(message)
            break;
    }
}


module.exports = errorHandler