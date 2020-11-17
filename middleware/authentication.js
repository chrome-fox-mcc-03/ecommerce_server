const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = function(req, res, next) {
    const Access_Token = req.header("Access_Token")
    console.log(Access_Token)
    const authenticated = jwt.verify(Access_Token, process.env.SECRET)
    req.authenticated = authenticated

    User.findOne({
        where: {
            id: req.authenticated.id
        }
    })
        .then(function(result) {
            if(result) {
                next()
            }
            else {
                let err = {
                    msg: "Not Authenticated"
                }
                throw err
            }
        })
        .catch(function(err) {
            next(err)
        })
}