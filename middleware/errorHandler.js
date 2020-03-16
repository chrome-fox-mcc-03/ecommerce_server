function errorHandler(err, req, res, next){
    console.log(err, 'err name here');
    
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
            res.status(err.status).json(err.message)
            break;
        default:
            console.log(status, 'default here');
            
            res.status(status).json(message)
            break;
    }
}


module.exports = errorHandler