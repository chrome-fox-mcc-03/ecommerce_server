const { Customer } = require('./../models')
const { makeToken } = require('./../helper/jwt')
const { comparePass } = require('./../helper/bcrypt')
class ControllerCustomer {
	static register (req, res, next) {
		const { email, password, money } = req.body
		Customer.create({
			email,
			password,
			money
		})
			.then(result => {
				const payload = {
					id: result.id,
					email: result.email,
					money: result.money
				}
				res.status(201).json(payload)
			})
			.catch(err => {
				next(err)
			})
	}

	static login (req, res, next) {
		console.log("ROUTE CUSTOMER")
		const { email, password } = req.body
		Customer.findOne({
			where: {
				email
			}
		})
			.then(result => {
				if (!result) {
					const error = {
						name: 'Invalid email/password'
					}
					throw error
				} else {
					const condition = comparePass(password, result.password)
					if (!condition) {
						const error = {
							name: 'Invalid email/password'
						}
						throw error
					} else {
						const payload = {
							id: result.id,
							email: result.email,
							money: result.money
						}
						const token = makeToken(payload)
						req.headers.token = token
						res.status(200).json({ token })
					}
				}
			})
			.catch(err => {
				next(err)
				// res.status(500).json(err)
			})
	}

	static getById (req, res, next) {
		const id = req.params.id
		Customer.findByPk(id)
			.then(result => {
				if (!result) {
					const error = {
						name: 'customer not found'
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

	static edit (req, res, next) {
		const id = req.params.id
		const { password, money } = req.body
		Customer.update({
			password,
			money
		}, {
			where: {
				id
			},
			returning: true
		})
			.then(result => {
				const updated = result[1][0]
				const payload = {
					id: updated.id,
					email: updated.email,
					money: updated.money
				}
				res.status(200).json(payload)
			})
			.catch(err => {
				next(err)
			})
	}

	static delete (req, res, next) {
		const id = req.params.id
		let deleted
		Customer.findByPk(id)
			.then(result => {
				if (!result) {
					const error = {
						name: 'customer not found'
					}
					throw error
				} else {
					deleted = result
					return Customer.destroy({
						where: {
							id
						}
					})
				}
			})
			.then(result => {
				const payload = {
					id: deleted.id,
					email: deleted.email,
					money: deleted.money
				}
				res.status(203).json(payload)
			})
			.catch(err => {
				next(err)
			})
	}

}

module.exports = ControllerCustomer