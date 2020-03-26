const { validateToken } = require('../helpers/jwt');
const { User } = require('../models')

module.exports = (req, res, next) => {
    let token = req.headers.token;
    // console.log(req.params.id);
    
    if(!token) {
        next({
            status: 401,
            msg: `this email haven't been signed up`
        })
    } else {
        let payload = validateToken(token);
        if(!payload) {
            next({
                status: 401,
                msg: `this email haven't been signed up`
            })
        } else {
            
            let { email, id } = payload;
            User.findOne({
                where: {
                    id
                }
            })
            .then(result => {
                req.decoded = result;
                next()
            })
            .catch(error => {
                res.status(401).json(`this email haven't been signed up`)
            })
        }
    }
}