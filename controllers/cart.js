const { Cart, Product, sequelize } = require('../models')

module.exports = {
  addCart(req, res, next) {
    const UserId = req.decoded.id
    const { ProductId, amount } = req.body
    let name = ''

    Product.findOne({
      where: { id: ProductId }
    })
      .then(data => {
        name = data.name
        return Cart.create({
          UserId, ProductId, amount
        })
      })
      .then(_ => {
        res.status(201).json({
          message: `success add ${name} to cart`
        })
      })
      .catch(next)

  },
  findAllCart(req, res, next) {
    const UserId = req.decoded.id

    Cart.findAll({
      where: { UserId, status: false },
      include: [Product],
      order: [['id', 'ASC']]
    })
      .then(data => {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  },
  updateAmount(req, res, next) {
    const { id } = req.params
    const { oldAmount, newAmount } = req.body
    let message = ''

    Cart.update({
      amount: oldAmount + +newAmount
    }, {
      where: { id }
    })
      .then(_ => {
        +newAmount > 0 ? message = 'success add amount' : message = 'success reduce amount'
        res.status(200).json({
          message
        })
      })
      .catch(next)
  },
  deleteCart(req, res, next) {
    const { id } = req.params

    Cart.destroy({
      where: { id }
    })
      .then(_ => {
        res.status(200).json({
          message: 'success delete product from cart'
        })
      })
      .catch(next)
  },
  findAllHistory(req, res, next) {
    const UserId = req.decoded.id

    Cart.findAll({
      where: { UserId, status: true },
      include: [Product],
      order: [['id', 'ASC']]
    })
      .then(data => {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  },
  checkoutCart(req, res, next) {
    const UserId = req.decoded.id
    let promises = []

    Cart.findAll({
      where: { UserId, status: false },
      include: [Product]
    })
      .then(data => {
        return sequelize.transaction(t => {
          data.forEach(el => {
            if (el.Product.stock > el.amount) {
              promises.push(
                Cart.update(
                  { status: true },
                  { where: { UserId } },
                  { transaction: t }
                ),
                Product.update(
                  { stock: el.Product.stock - el.amount },
                  { where: { id: el.Product.id } },
                  { transaction: t }
                )
              )
            } else {
              next({
                status: 400,
                message: `${el.Product.name} stock is less than your cart amount`
              })
            }
          })
          return Promise.all(promises)
        })
      })
      .then(_ => {
        res.status(200).json({
          message: 'success checkout cart'
        })
      })
      .catch(next)
  }
}