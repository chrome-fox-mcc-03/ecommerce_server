const { Cart } = require('../models')


class ControllerCart {
  static async findHistory (req,res,next) {
    try {
      const result = await Cart.findAll ({
        where : {
          status : true
        }
      })
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
  static async findAll (req,res,next) {
    try {
      const result = await Cart.findAll({
        where : {
          UserId : req.UserId
        }
      })
    } catch (error) {
      next(error)
    }
  } 
}

module.exports = ControllerCart