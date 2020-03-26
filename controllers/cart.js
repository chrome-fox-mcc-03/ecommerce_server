const { Cart, Product } = require('../models')

class CartController {
    static findAll(req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.decoded.id
            },
            include: [ Product ]
        })
            .then(result => {                                
                let carts = result.map(el => {
                    return {
                        id: el.id,
                        name: el.Product.name,
                        ProductId: el.Product.id,
                        quantity: el.quantity,
                        totalPrice: el.totalPrice,
                        image_url: el.Product.image_url,
                        status: el.status,
                        price: el.Product.price,
                        stock: el.Product.stock,
                        updatedAt: el.updatedAt
                    }
                })        
                res.status(200).json(carts)
            })
            .catch(err => {
                next(err)
            })
    }

    static addToCart(req, res, next) {
        let UserId = req.decoded.id
        let quantityItem;
        let { ProductId, totalPrice }  = req.body
        Cart.findOne({
            where: {
                ProductId
            },
            include: [ Product ]
        })
            .then(cart => {                
                if(cart) {
                quantityItem = cart.quantity                   
                return Cart.update({
                    quantity: quantityItem + 1,
                    totalPrice: (quantityItem + 1) * cart.Product.price
                }, {
                    where: {
                        ProductId
                    }
                })
                } else {
                return Cart.create({
                        quantity: 1,
                        totalPrice,
                        UserId,
                        ProductId
                    })
                }
            })
            .then(cart => {
                res.status(201).json(cart)
            })
            .catch(err => {
                next(err)
            })
    }


  static update (req, res, next) {
    const id = req.params.id
    const { quantity } = req.body
    Cart.findOne({
        where: {
            id
        },
        include: [ Product ]
    })
    
      .then(cart => {
        let totalPrice = quantity * cart.Product.price
        return Cart.update({
            quantity,
            totalPrice
        }, {
            where: {
                id
            }
        })
      })
      .then(cart => {
        res.status(200).json({
          status: cart,
          msg: 'success updated cart'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static delete (req, res, next) {
    const id = req.params.id
    Cart.destroy({
        where: {
            id
        }
    })
      .then(result => {
        res.status(200).json({
          status: result,
          msg: 'success deleted cart'
        })
      })
      .catch(err => {
        next(err)
      })
    }

  static checkOut(req, res, next) {
    const { ProductId, quantity, id } = req.body
    let maxStock
    Product.findOne({
        where: {
            id: ProductId
        }
    })
        .then(product => {
        maxStock = product.stock
        if (product.stock >= quantity) {
            const stock = product.stock - quantity
            return Cart.update({
                status: true
            }, {
                where: {
                    id
                }
            })
            .then(cart => {
                return Product.update({
                    stock
                }, {
                    where: {
                        id: ProductId
                    }
                })
            })
            .then(result => {
                res.status(200).json({ 
                    result, 
                    msg: 'transaction success'
                })
        })
        } else {
            next({
            status: 400,
            msg: `not enough stock, stock is only ${maxStock}`
            })
        }
        })
        .catch(err => {
            next(err)
        })
    }

}


module.exports = CartController