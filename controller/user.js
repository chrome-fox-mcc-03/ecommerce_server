const { User } = require('../models')
const { comparepw } = require('../helper/bcypt')
const { sign } = require('../helper/jwt')

class ControllerUser {
    static async registerAdmin (req,res,next){
      try {
        const { email, password } = req.body
        const newUser = await User.create({
          email,
          password,
          RoleId : 1
        })
        const payload = {
          id : newUser.id,
          email : newUser.email,
          RoleId : newUser.RoleId
        }
        res.status(201).json(payload)
      } catch (error) {
        next(error)
      }
    }
    static async loginAdmin (req,res,next) {
      try {
        const { email, password } = req.body
        const checkLogin = await User.findOne({
          where : {
            email
          }
        })
        if(checkLogin) {
          const validate = comparepw(password,checkLogin.password)
          if(validate) {
            const payload = {
              email : checkLogin.email,
              id : checkLogin.id,
              RoleId : 1
            }
            const token = sign(payload)
            res.status(200).json({token})
          }else{
            throw {
              name : 'costume',
              status : 400,
              message : "email / password wrong"
            }
          }
        }else{
          throw {
            name : 'costume',
            status : 400,
            message : "email / password wrong"
          }
        }
      } catch (error) {
        next(error)
      }
    }
}

module.exports = ControllerUser