const { Cart, Product } = require('../models')
const mailer = require('../helpers/nodemailer')

class CartController {
	static addToCart (req, res, next) {
		const UserId = req.decoded.id
		const { ProductId } = req.body

		let statusResponse = 200

		Cart.findOne({
			where: {
				ProductId,
				UserId,
				isPaid: false
			}
		})
			.then(result => {
				if (result) {
					const { id } = result
					return Cart.increment('quantity', {
						by: 1,
						where: { id }
					})
				} else {
					statusResponse = 201
					return Cart.create({
						ProductId,
						UserId,
						quantity: 1
					})
				}
			})
			.then(result => {
				console.log(result);
				return Cart.findAll({
					where: { UserId, isPaid: false },
					include: [ Product ],
					order: [['createdAt', 'ASC']]
				})
			})
			.then(carts => {
				const addedItem = carts.filter(el => el.Product.id === ProductId)
				
				res.status(statusResponse).json({
					carts,
					message: `${addedItem[0].Product.name} added to your cart`
				})
			})
			.catch(err => {
				next(err);
			})
	}

	static getCart (req, res, next) {
		const UserId = req.decoded.id

		Cart.findAll({
			where: { UserId, isPaid: false },
			include: [ Product ],
			order: [['createdAt', 'ASC']]
		})
			.then(carts => {
				res.status(200).json({
					carts
				})
			})
			.catch(err => {
				next(err);
			})
	}

	static update (req, res, next) {
		const UserId = req.decoded.id
		const { id } = req.params
		const { quantity } = req.body

		if (!quantity) {
			next({
				status: 400,
				name: 'Invalid Input',
				message: 'Quantity is required'
			})
		} else {
			Cart.update({
				quantity
			}, {
				where: { id }
			})
				.then(result => {
					return Cart.findAll({
						where: { UserId, isPaid: false },
						include: [ Product ],
						order: [['createdAt', 'ASC']]
					})
				})
				.then(carts => {
					res.status(200).json({
						carts,
						message: 'Your cart successfully updated'
					})
				})
				.catch(err => {
					next(err)
				})
		}
	}

	static delete (req, res, next) {
		const UserId = req.decoded.id
		const { id } = req.params

		let productName = ''
		Cart.findOne({
			where: { id },
			include: [ Product ]
		})
			.then(result => {
				productName = result.Product.name

				return Cart.destroy({
					where: { id }
				})
			})
			.then(result => {
				return Cart.findAll({
					where: { UserId, isPaid: false },
					include: [ Product ],
					order: [['createdAt', 'ASC']]
				})
			})
			.then(carts => {
				res.status(200).json({
					carts,
					message: `${productName} is removed from your cart`
				})
			})
			.catch(err => {
				next(err)
			})
	}

	static pay (req, res, next) {
		const { id } = req.body

		let items = []
		let cartItems = []
		Cart.findAll({
			where: { isPaid: false },
			include: [ Product ]
		})
			.then(result => {
				cartItems = result
				items = result.map(el => el.id)

				return Cart.update({
					isPaid: true
				}, {
					where: { id: items }
				})
			})
			.then(result => {
				Promise.all(cartItems.map(el => {
					return Product.decrement('stock', {
						by: el.quantity,
						where: { id: el.Product.id }
					})
				}))
			})
			.then(result => {
				const body = {
					form: '"hacktiv8 shop" <hacktiv8shop@gmail.com>',
					to: req.decoded.email,
					subject: 'Thank you for your H8-Ecommerce purchase',
					html: `
					<h4>Hello ${req.decoded.email}</h4>
					<br>
					<h5>Thank you for your recent transaction on H8-Ecommerce.<br>The items you purchase will head to your place soon.</h5>
					`
				}
				mailer.sendMail(body, (error, info) => {
					if (error) console.log(error);
					else console.log(info);
				})

				res.status(200).json({
					message: 'Thank you for the purchase. Your cart has successfully paid.'
				})
			})
			.catch(err => {
				next(err)
			})
	}

	static getHistory (req, res, next) {
		const UserId = req.decoded.id
		console.log(`masuk ga sih?`);
		Cart.findAll({
			where: {
				isPaid: true,
				UserId
			},
			include: [ Product ]
		})
			.then(carts => {
				console.log(carts);
				res.status(200).json({
					carts
				})
			})
			.catch(err => {
				console.log(err);
				next(err)
			})
	}
}

module.exports = CartController