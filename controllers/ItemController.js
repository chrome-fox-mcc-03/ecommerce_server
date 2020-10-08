const { Item, Category } = require('../models')
const { authAdmin } = require('../middlewares/auth')

module.exports = 
  class ItemController {
    static findAll (req, res, next) {
      Item.findAll({
        order: [['id']],
        include: Category
      })
        .then(items => res.status(200).json({ items }))
        .catch(next)
    }

    static findByPk (req, res, next) {
      const { itemId } = req.params
      Item.findByPk(itemId, {
        include: Category
      })
        .then(item => {
          if (!item) {
            throw {
              status: 400,
              message: 'Item not found'
            }
          } else {
            res.status(200).json({ item })
          }  
        })
        .catch(next)
    }

    static create (req, res, next) {
      const { name, imageUrl, price, stock, CategoryId } = req.body
      Item.create({ name, imageUrl, price, stock, CategoryId })
        .then(() => res.status(201).json({ message: 'Create item successful' }))
        .catch(next)
    }

    static update (req, res, next) {
      const { itemId } = req.params
      const { name, imageUrl, price, stock, CategoryId } = req.body
      Item.update({ name, imageUrl, price, stock, CategoryId }, {
        where: { id: itemId }
      })
        .then(response => {
          if (!response[0]) {
            throw {
              status: 400,
              message: 'Item not found'
            }
          } else {
            res.status(200).json({ message: 'Update item successful'})
          }
        })
        .catch(next)
    }

    static delete (req, res, next) {
      const { itemId } = req.params
      Item.destroy({
        where: { id: itemId }
      })
        .then(response => {
          if (!response) {
            throw {
              status: 400,
              message: 'Item not found'
            }
          } else {
            res.status(200).json({ message: 'Delete item successful' })
          }
        })
        .catch(next)
    }
  }