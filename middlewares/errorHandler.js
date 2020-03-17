const errorHandler = (err, req, res, next) => {
    let message
    let error
    switch (err.name) {
        case 'SequelizeValidationError':
            message = err.errors.map(el => {
                return el.message
            })
            error = {
                message: message[0],
                errors: message
            }
            res.status(400).json(error)
            break;
        case 'SequelizeUniqueConstraintError':
            message = err.errors[0].message
            error = {
                message: message,
                errors: [message]
            }
            res.status(400).json(error)
            break;
        case 'Invalid email/password':
            message = err.name
            error = {
                message,
                errors: [message]
            }
            res.status(400).json(error)
            break;
        case 'product not found':
            message = err.name
            error = {
                message,
                errors: [message]
            }
            res.status(400).json(error)
            break;
        case 'JsonWebTokenError':
            message = 'You are not authenticated'
            error = {
                message,
                errors: [message]
            }
            res.status(404).json(error)
            break;
        case 'user not found': 
            console.log('from user not found')
            message = err.name
            error = {
                message,
                errors: [message]
            }
            res.status(400).json(error)
        default:
            message = 'Database Error'
            error = {
                message,
                errors: [message]
            }
            console.log(err)
            res.status(500).json(error)
            break;
    }
}

module.exports = errorHandler