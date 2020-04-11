const { User } = require('../models')

module.exports = async (req,res,next) => {
  try {
    const result = await User.findOne({
      where : {
        RoleId : req.RoleId
      }
    })
    if(result.RoleId == 1) {
      next()
    }else{
      throw {
        message : "you Don`t have Authorized"
      }
    }
  } catch (error) {
    next(error)
  }
}