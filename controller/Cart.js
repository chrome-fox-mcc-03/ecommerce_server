const { Cart, Production, Category, sequelize } = require('../models')
const { Op } = require("sequelize");

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
          UserId : req.CurrentId
        },
        include: [Production],
        attributes: {
          include: ['id']
        },
        order: [
            ['id', 'ASC']
        ]
      })
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
  static async addToCart(req,res,next) {
    try {
      const {idProduct, stock} = req.body
      const data = await Cart.findOne({
        where:
        {
          ProductionId: idProduct,
          Status: {
            [Op.not]: true
          }
        },
        attributes: {
          include: ['id']
        }
      })
      if(data) {
          const add = await Cart.increment('Stock', {
          by: 1,
          where: {
            id: data.id
          },
        })
        if(add) {
          res.status(200).json({
            message: "add Success"
          })
        }else{
          console.log('masok sini')
        }
      }else{
        const addcart = await Cart.create({
          ProductionId: idProduct,
          Stock: stock,
          UserId: req.CurrentId,
          Status: false
        })
        if(addcart) {
          res.status(200).json({
            message: "success"
          })
        }else{
          console.log('masook sini add')
        }
      }
    } catch (error) {
      next(error)
    }
  }
  static async deleted(req,res,next) {
    try {
      const  { id } = req.params
      const data = await Cart.destroy({
        where: {
          id
        }
      })
      if(data) {
        res.status(200).json({
          message: "Delete Success"
        })
      }
    } catch (error) {
      next(error)
    }
  }
  static async addQuanty(req,res,next) {
    try {
      const { id } = req.params
      const data = await Cart.increment('Stock', {
        where: {
          id
        }
      })
      if(data) {
        res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }
  static async descQuanty(req,res,next) {
    try {
      const { id } = req.params
      const data = await Cart.decrement('Stock', {
        where: {
          id
        }
      })
      if(data) {
        res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }
  static checkout (req,res,next) {
    try {
      let promiseTamp;
        Cart.findAll({
          where : {
            UserId : req.CurrentId
          },
          include: [Production],
          attributes: {
            include: ['id']
          },
          order: [
              ['id', 'ASC']
          ]
        })
        .then(data => {
          promiseTamp = data
          let promiseTamp1 = []
          data.forEach(el => {
            if(el.Stock <= el.Production.stock) {
              promiseTamp1.push(Cart.update({
                Status: true
              },
              {
                where: {
                  id: el.id
                }
              }))
            }else {
              next({
                name: "costume",
                status: 404,
                message: "message undifiend"
              })
            }
            return Promise.all(promiseTamp1)
          })
        })
        .then(data => {
          let promiseTamp2 = []
          promiseTamp.forEach(el => {
            promiseTamp2.push(Production.decrement('stock', {
              by: el.Stock,
              where: {
                id: el.ProductionId
              }
            }))
            return Promise.all(promiseTamp2)
          })
        })
        .then(data => {
          res.status(200).json({
            message: "aowkdoawkdow"
          })
        })
    } catch (error) {
      next(error)
    }
  }
  static async category (req, res, next) {
    try {
      const data = await Category.findAll()
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerCart