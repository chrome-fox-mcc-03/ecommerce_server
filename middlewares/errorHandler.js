const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case 'SequelizeValidationError':
            let message = err.errors.map(el => {
                return el.message
            })
            let error = {
                message: message[0],
                errors: message
            }
            res.status(400).json(error)
            break;
    
        default:
            break;
    }
}

module.exports = errorHandler