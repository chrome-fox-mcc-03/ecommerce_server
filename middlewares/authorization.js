let { Product } = require('../models');

module.exports = {
	roleAuthorization (req, res, next) {
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
	productAuthorization (req, res, next) {
		let { id } = req.decoded;

		Product.findOne({
			where: { UserId: id}
		})
			.then(result => {
				if (result) {
					next();
				} else {
					console.log(`prodsalah`);
					next({
						name: 'Unauthorized',
						message: 'You are unauthorized'
					})
				}
			})
			.catch(err => {
				next(err);
			})
	}
}