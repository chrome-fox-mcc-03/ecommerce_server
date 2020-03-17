module.exports = function(err, req, res, next) {

    if(err.name) {
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
           
                message = {
                    message: "Bad Request Default",
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
        
            default:
                message = {
                    message: "Internal Server testing Error"
                }
                res.status(500).json(message)
                break;
        }
    }
}