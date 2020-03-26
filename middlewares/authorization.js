let { Cart } = require('../models');

module.exports = {
	adminAuthorization (req, res, next) {
		let { role } = req.decoded;

		if (role === 'admin') {
			next();
		} else if (role === 'customer') {
			next({
				name: 'Unauthorized',
				message: 'You are unauthorized'
			})
		}
	},
	customerAuthorization (req, res, next) {
		const UserId = req.decoded.id,
			  role = req.decoded.role
			  id = req.params.id
		if (role === 'customer') {
			Cart.findOne({
				where: { id }
			})
				.then(result => {
					if (result) {
						if (result.UserId === UserId) {
							next();
						} else {
							next({
								name: 'Unauthorized',
								message: 'You are unauthorized'
							})
						}
					} else {
						next({
							name: 'PageNotFound',
							model: 'Item'
						})
					}
				})
				.catch(err => {
					console.log('error di authorization', err);
					next(err);
				})
		} else if (role === 'admin') {
			next({
				name: 'Unauthorized',
				message: 'You are unauthorized'
			})
		}
	}
}