module.exports = function (err, req, res, next) {
    console.log(err.name);
    console.log(err.errors);
    
    if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Your email has already registered' })
    } else if (err.name === 'SequelizeValidationError') {
        let message = err.errors.map(error => error.message)
        console.log(message);
        res.status(400).json({ message })
    } else {
        res.status(err.status || 500).json(er.message || 'Internal server error')
    }
}
