module.exports = function(err, req, res, next) {
    if(err.name) {
        console.log(err.name)
        let message;
        let errors;
        let status;
        switch (err.name) {
            case "SequelizeValidationError":
                errors = []
                err.errors.forEach(element => {
                    errors.push(element.message)
                });
                message = {
                    message: "Bad Request",
                    errors
                }
                status = 400
                res.status(status).json(message)
                break;
            case "ReferenceError":
                message = {
                    message: "Internal Server Error"
                }
                status = 500
                res.status(status).json(message)    
        
            default:
                console.log(err)
                console.log(err.name)
                message = {
                    message: err.message,
                    errors
                }
                res.status(400).json(message)
                break;
        }
    }
    else {
        switch (err.msg) {
            case "Wrong Email / Password":
                message = {
                    message: "Wrong Email / Password"
                }
                res.status(400).json(message)
                
                break;
            case "Not Authorized":
                message = {
                    message: "Not Authorized"
                }
                res.status(400).json(message)
                break;
            case "Insufficient Stock":
                message = {
                    message: "Insufficient Stock",
                    id: err.id,
                    Stock: err.Stock
                }
                res.status(400).json(message)
                break;
            default:
                console.log(err)
                console.log(err.msg)
                message = {
                    message: "Internal Server testing Error"
                }
                res.status(500).json(message)
                break;
        }
    }
}