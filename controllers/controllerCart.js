const { Cart, Customer } = require('./../models')

class ControllerCart {

	static fetchAll (req, res ,next) {
		const CustomerId = req.decoded.id
		Cart.findAll({
			where: {
				CustomerId
			},
			include: [Customer]
		})
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => {
				next(err)
			})
	}

	static addCart (req, res, next) {
		const CustomerId = req.decoded.id
		const email = req.decoded.email
		Cart.create({
			CustomerId,
			isPaid: false
		})
			.then(result => {
				const payload = {
					id: result.id,
					email: email,
					CustomerId: result.CustomerId,
					isPaid: result.isPaid
				}
				res.status(200).json(payload)
			})
			.catch(err => {
				next(err)
			})
	}

	static getById (req, res, next) {
		const id = req.params.id
		Cart.findByPk(id)
			.then(result => {
				if (!result) {
					const error = {
						name: 'cart not found'
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
		const email = req.decoded.email
		Cart.update({
			isPaid: true
		},{
			where: {
				id
			},
			returning: true
		})
			.then(result => {
				const updated = result[1][0]
				updated.dataValues.email = email
				res.status(200).json(updated)
			})
			.catch(err => {
				next(err)
			})
	}

	static delete (req, res, next) {
		const id = req.params.id
		const email = req.decoded.email
		let cart
		Cart.findByPk(id)
			.then(result => {
				if (!result) {
					const error = {
						name: 'cart not found'
					}
					throw error
				} else {
					cart = result
					return Cart.destroy({
						where: {
							id
						}
					})
				}
			})
			.then(result => {
				cart.dataValues.email = email
				res.status(203).json(cart)
			})
			.catch(err => {
				next(err)
			})
	}
}

module.exports = ControllerCart