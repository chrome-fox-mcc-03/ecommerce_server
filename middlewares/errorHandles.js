module.exports = function (err, req, res, next) {
    if (err.name) {
        switch (err.name) {
            case 'SequelizeValidationError':
                const errors = err.errors.map(el => el.message)
                res.status(400).json({errors})
                break
            case 'SequelizeDatabaseError':
                res.status(400).json(err);
                break;
            case 'SequelizeConnectionError':
                res.status(500).json(err)
                break
            default:
                console.log(err)
                res.status(500).json(err)
                break;
        }   
    } else if (err.status) {
        res.status(err.status || 500).json(err.message || 'Internal Server Error')
    }
}