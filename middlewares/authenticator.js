const { User } = require('../models');
const { getPayload } = require('../helpers/jwt');
const appPayload = require('../helpers/appPayload');
const appError = require('../helpers/appError');

module.exports = function (req, res, next) {
    const access_token = req.headers.access_token;
    // const access_token = req.header('access_token');
    // console.log(req.headers);
    if (!access_token) {
        next(appError(401, "please login as valid user"));
    } else {
        let payload = getPayload(access_token);
        if (!payload) {
            next(appError(401, "please login as valid user"));
        } else {
            payload = appPayload(payload);
            if (!payload.email || !payload.id) {
                next(appError(401, "appPayload not found"));
            } else {
                User.findOne({
                    where: payload,
                })
                    .then(result => {
                        if (!result) {
                            next(appError(401, "please login as valid user"));
                        } else {
                            next();
                        }
                    })
                    .catch(next);
            }
        }
    }
}