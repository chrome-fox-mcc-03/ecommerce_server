const { User } = require('../models')

class AdminController {
    static showUsers (req, res, next) {
        User.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })
            .then((response) => {
                res.status(200).json({
                    data: response
                })

            })
            .catch((err) => {
                next(err)
            })
    }


}

module.exports = AdminController