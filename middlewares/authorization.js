const {User} = require('../models')
const helper = require('../helpers/helper')
module.exports = {
    authorization: (req,res,next) => {
        const {token} = req.headers
        let decoded = helper.decodedToken(token)
        User.findOne({
            where:{id: decoded.id}
        })
        .then((result) => {
            const {isAdmin} = result.dataValues
            if(isAdmin) {
                next()
            }
            else {
                next({status:403,message:"can't trespassing"})
            }
        }).catch((err) => {
            next(err)
        });
    }
}