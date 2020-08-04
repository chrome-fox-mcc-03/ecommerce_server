const JWT = require('../helpers/jwt')
const { User } = require('../models')

module.exports = function(req, res, next) {
  const token = req.headers.token 
  try {
    const decoded = JWT.verify(token)
    User.findOne({where: {id: decoded.id}})
      .then(data => {
        if (data) {
          req.id = data.id
          next()
        } else {
          next({name: "DATA NULL", message:"Please login again!"})
        }
      })
  } catch(err) {next(err)}
}