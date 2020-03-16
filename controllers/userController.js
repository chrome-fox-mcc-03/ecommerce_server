const {
    User
} = require('../models/index')
class controller {
    static register(req, res, next) {
        let {
            email,
            password
        } = req.body
        User.create({
                email,
                password
            })
            .then(result => {
                res.status(201).json({
                    email: result.email,
                    id: result.id
                })
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = controller