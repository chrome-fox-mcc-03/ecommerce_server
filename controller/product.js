const { Production } = require('../models')

class ControllerProduction {
  static async productAdd (req,res,next) { 
    try {
      const { name, price, description, url, stock, CategoryId } = req.body
      console.log(price)
      console.log(stock)
      const data = await Production.create({
        name,
        price,
        description,
        url,
        stock,
        CategoryId
      })
      if(data) {
        res.status(201).json({
          message : "add success",
          id : data.id
        })
      }
    } catch (error) {
      next(error)
    }
  }
  static async productEdit (req,res,next) {
    try {
      const { name, price, description, url, stock,CategoryId } = req.body
      const { id } = req.params
      console.log(id, name, price, description, url, stock,CategoryId)
      const data = await Production.update({
        name,
        price,
        description,
        url,
        stock,
        CategoryId
      },
      {
        where: {id}
      })
      if(data) {
        res.status(200).json({
          message : "edit success"
        })
      }
    } catch (error) {
      next(error)
    }
  }
  static async productDelete (req,res,next) {
    const { id } = req.params
    try {
      const data = await Production.destroy({
        where : {
          id
        }
      })
      if(data) {
        console.log('massuk')
        res.status(200).json({
          message : "delete success"
        })
      }else{
        throw{
          name: 'costume',
          status : 400,
          message : "delete failed"
        }
      }
    } catch (error) {
      next(error)
    }
  }
  static async productfindOne (req,res,next) {
    const { id } = req.params
    try {
      const data = await Production.findOne({
        id
      })
      if(data) {
        res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }
  static async productFindAll (req,res,next) {
    try {
      const data = await Production.findAll({
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async productfindOneCategory(req,res,next) {
    const { CategoryId } = req.body
    try {
      const data = await Production.findAll({
        where : {
          CategoryId
        }
      })
      if(data) {
        res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerProduction