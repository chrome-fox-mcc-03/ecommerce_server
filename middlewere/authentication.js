const { verifyToken } = require('../helper/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
  try{
    if(req.headers.token) {
      let decoded = verifyToken(req.headers.token)
      req.currentUserid = decoded.id
      User.findByPk(
        Number(req.currentUserid)
      )
      .then(result => {
        if(result) {
          next()
        }
        else {
          next({ name: 'Not authenticated' })
        }
      })
      .catch(next)
    }
    else {
      next({ name: 'Not authenticated' })
    }
  }
  catch{
    next({ name: 'Not authenticated' })
  }
}

module.exports = authentication