const { User } = require('../models')
const { getPayload } = require('../helpers/jwt');
const appPayload = require('../helpers/appPayload');
const appError = require('../helpers/appError');

function adminAuthorizator (req, res, next) {
  const access_token = req.headers.access_token;
  let payload = appPayload(getPayload(access_token));
  User.findOne({
      where: payload,
  })
    .then(result => {
      if (result) {
        next()
      } else {
        next(appError(403, "user not authorized"))
      }
    })
    .catch(next)
}

module.exports = {
  adminAuthorizator
}