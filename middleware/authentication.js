const { decode } = require('../helper/jwt')
const { User } = require('../models')

module.exports = async (req,res,next) => {
  try {
    const payload = decode(req.headers.token)
    console.log(payload)
    req.RoleId = payload.payload.RoleId
    const result = await User.findOne({
      where : {
        email : payload.payload.email
      }
    })
    if(result) {
      next()
    }else{
      throw{
        message : "Please login first as admin"
      }
    }
  } catch (error) {
    next(error)
  }
}