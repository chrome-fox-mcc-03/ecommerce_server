const { User } = require('../models/index');

module.exports = function(req, res, next) {
    console.log(['Current User: '], req.currentUserId);
    User.findOne({
        where: {
            id: req.currentUserId
        }
    })
        .then(user => {
            if (user.is_admin) {
                next()
            } else {
                res.status(401).json({ status: 401, message: "Authorization failed" })
            }
        })
        .catch(err => {
            console.log('errorrrrr disini');
            res.status(500).json(err)
        })
}