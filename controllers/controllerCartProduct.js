const { CartProduct, Product, Cart } = require('./../models')
class ControllerCartProduct {
	static fetchAll (req, res, next) {
		CartProduct.findAll({
			include: [Product, Cart]
		})
			.then(result => {
				const allowedArr = result.filter(el => {
					return el.dataValues.Cart.CustomerId === req.decoded.id
				})
				console.log(allowedArr)
				console.log(req.decoded.id)
				res.status(200).json(allowedArr)
			})
			.catch(err => {
				next(err)
			})
	}

	static addCartProduct (req, res, next) {
		const { CartId, ProductId, quantity } = req.body
		const CustomerId = req.decoded.id
		Cart.findByPk(CartId)
			.then(result => {
				if (!result) {
					const error = {
						name: 'cart not found'
					}
					throw error
				} else {
					if (CustomerId !== result.CustomerId) {
						const error = {
							name: 'you are not authorized'
						}
						throw error
					} else {
						return CartProduct.create({
							CartId,
							quantity,
							ProductId
						})
					}
				}
			})
			.then(result => {
				res.status(201).json(result)
			})
			.catch(err => {
				next(err)
			})
	}

	static getById (req, res, next) {
		const id = req.params.id
		CartProduct.findByPk(id)
			.then(result => {
				if (!result) {
					const error = {
						name: 'cart-product not found'
					}
					throw error
				} else {
					res.status(200).json(result)
				}
			})
			.catch(err => {
				next(err)
			})
	}

	static update (req, res, next) {
		const id = req.params.id
		const { quantity } = req.body
		CartProduct.update({
			quantity
		}, {
			where: {
				id
			},
			returning: true
		})
			.then(result => {
				const updated = result[1][0]
				res.status(200).json(updated)
			})
			.catch(err => {
				console.log(err)
				next(err)
			})
	}

	static delete (req, res, next) {
		const id = req.params.id
		let deleted
		CartProduct.findByPk(id, {
			include: [Cart, Product]
		})
			.then(result => {
				if (!result) {
					const error =  {
						name: 'cart-product not found'
					}
					throw error
				} else {
					deleted = result
					return CartProduct.destroy({
						where: {
							id
						}
					})
				}
			})
			.then(result => {
				res.status(203).json(deleted)
			})
			.catch(err => {
				next(err)
			})

	}
}

module.exports = ControllerCartProduct