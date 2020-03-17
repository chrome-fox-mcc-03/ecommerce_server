module.exports = function(err, req, res, next) {

    if(err.name) {
        switch (err.name) {
            case "SequelizeValidationError":
                let errors = []
                err.errors.forEach(element => {
                    errors.push(element.message)
                });
                let message = {
                    message: "Bad Request",
                    errors
                }
                let status = 400
                res.status(status).json(message)
                break;
        
            default:
                console.log(err)
                break;
        }
    }
    else {
        switch (err.msg) {
            case "value":
                
                break;
        
            default:
                console.log(err)
                break;
        }
    }
}