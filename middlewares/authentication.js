const { User } = require('../models');
const { verify } = require('../helpers/jwt');

module.exports = (req, res, next) => {
	let { token } = req.headers

	let payload = {};

	try {
		payload = verify(token);
	} catch (error) {
		next(error)
	}

	let { id, email, role } = payload;

	User.findOne({
		where: { id, email, role }
	})
		.then(result => {
			if (result) {
				req.decoded = payload;
				next();
			} else {
				next({
					name: 'Invalid User'
				})
			}
		})
		.catch(next)
}