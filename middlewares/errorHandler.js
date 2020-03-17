module.exports = (err, req, res, next) => {
	if (err.name === 'SequelizeValidationError') {
		let errors = err.errors.map(el => el.message);

		res.status(400).json({
			message: 'Bad Request',
			errors
		})
	} else if (err.name === 'SequelizeUniqueConstraintError') {
		res.status(400).json({
			message: 'Bad Request',
			errors: ['Email already registered']
		})
	} else if (err.name === 'Invalid User') {
		res.status(400).json({
			message: 'Bad Request',
			errors: ['Email/Password combination not match']
		})
	} else if (err.name === 'Unauthorized') {
		res.status(401).json({
			message: 'Unauthorized',
			errors: ['You are unauthorized']
		})
	} else if (err.name === 'JsonWebTokenError') {
		res.status(400).json({
			message: 'Bad Request',
			errors: ['Please login']
		})
	} else {
		// res.status(err.status || 500).json(err || 'Internal Server Error');
		console.log(err);
		res.status(err.status || 500).json(err);
	}
}