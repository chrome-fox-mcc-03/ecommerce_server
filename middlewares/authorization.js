const { User } = require('../models')

module.exports = (req, res, next) => {
  const id = req.UserId
  User.findOne({
    where: { id }
  })
    .then(user => {
      if (user.role === true) {
        next()
      } else {
        next({ status: 401, message: 'You Are Not Authorized' })
      }
    })
    .catch(next)
};
