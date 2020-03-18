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
	}
}