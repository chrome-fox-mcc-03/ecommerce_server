function checkRole(req, res, next) {
    if(req.user.role == 'admin') {
        next()
    } else {
        next({
            status: 401,
            message: {
                error: 'You do not have authorize to do this'
            }
        })
    }
}

module.exports = checkRole