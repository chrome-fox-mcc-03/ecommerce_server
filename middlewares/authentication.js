const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models/index');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token;
    req.decoded = verifyToken(token);
    let email = req.decoded.email

    User.findOne({
      where: { email }
    })
      .then(response => {
        if(response) next()
        // return null
      })
      .catch(err => {
        next({
          status: 401,
          msg: "Authentication failed! Please re-login"
        })
      })
    
  } catch (err) {
    next({
      status: 401,
      msg: "Authentication failed! Please re-login"
    })
  }
}