const { Customer } = require('./../models')
const { verify } = require('./../helper/jwt')
function authenticationCust(req, res, next) {
	try {
		const token = req.headers.token
		const decoded = verify(token)
		if (decoded) {
			Customer.findOne({
				where: {
					email: decoded.email
				}
			})	
				.then(result => {
					if (!result) {
						const error = {
							name: 'customer not found'
						}
						throw error
					} else {
						req.decoded = decoded
						next()
					}
				})
				.catch(err => {
					next(err)
				})
		}
	} catch (error) {
		next(error)
	}
}

module.exports = authenticationCust