const { Cart } = require('./../models')
function authorizationCart (req, res, next) {
	const id = req.params.id
	const CustomerId = req.decoded.id
	Cart.findByPk(id)
		.then(result => {
			if (!result) {
				const error = {
					name: 'cart not found'
				}
				throw error
			} else {
				if (result.CustomerId === CustomerId) {
					next()
				} else {
					const error = {
						name: 'you are not authorized'
					}
					throw error
				}
			}
		})
		.catch(err => {
			next(err)
		})
}

module.exports = {
	authorizationCart
}