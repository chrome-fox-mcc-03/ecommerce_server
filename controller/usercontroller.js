const {User} = require('../models')

class Controller {
    static Register(req, res, next) {
        let {Email, Password} = req.body
        User.create({Email, Password})
            .then(function(result) {
                let payload = {
                    Email: result.Email
                }
                // console.log(result, "result")
                // console.log('payload', payload)
                res.status(201).json(payload)
            })
            .catch(function(err) {
                next(err)
            })
    }


}

module.exports = Controller