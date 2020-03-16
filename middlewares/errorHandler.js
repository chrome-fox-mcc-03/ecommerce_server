module.exports = function (err, req, res, next) {
    if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Your email has already registered' })
    }
}
