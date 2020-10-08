const Helper = require('../helpers/helper')
const { User } = require('../models')

module.exports = (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const decoded = Helper.verify(access_token)
    req.UserId = decoded.id
    User.findOne({
      where: { id: req.UserId }
    })
      .then(user => {
        if (user) next()
        else next({ status: 401, message: `You Must Login / Register First` })
      })
      .catch(next)
  } catch (err) {
    next(err)
  }
};
