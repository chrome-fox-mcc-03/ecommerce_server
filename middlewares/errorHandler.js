function errorHandler(err, req, res, next) {
    if(err.name) {
        switch(err.name) {
            case "SequelizeValidationError":
                let errmsg = []
                err.errors.map(el => errmsg.push(el.message))
                res.status(400).json(errmsg.join(', '))
                break;
            case "SequelizeUniqueConstraintError":
                errmsg = []
                err.errors.map(el => errmsg.push(el.message))
                res.status(400).json(errmsg)
                break;
            default:
                console.log(err)
                res.status(500).json(err)
        }
    }
    else if(err.customMessage) {
        switch(err.customMessage) {
            case "Email/password does not match":
                res.status(400).json(err.customMessage)
                break;
            default:
                console.log(err)
                res.status(500).json(err.customMessage)
        }
    }
    else {
        console.log(err)
        return res.status(500).json(err)
    }
}
module.exports = errorHandler