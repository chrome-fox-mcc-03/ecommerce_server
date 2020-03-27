const { decode } = require('../helper/jwt')
const { User } = require('../models')

module.exports = async (req,res,next) => {
  try {
    const payload = decode(req.headers.token)
    req.CurrentId = payload.payload.id
    req.RoleId = payload.payload.RoleId
    const result = await User.findOne({
      where : {
        email : payload.payload.email
      }
    })
    if(result) {
      console.log(result)
      next()
    }else{
      throw{
        message : "Please login first"
      }
    }
  } catch (error) {
    next(error)
  }
}