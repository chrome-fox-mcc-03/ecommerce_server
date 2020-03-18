module.exports = (err, req, res, next) => {
	if (err.name === 'SequelizeValidationError') {
		let errors = err.errors.map(el => el.message);

		res.status(400).json({
			message: 'Invalid Input',
			errors
		})
	} else if (err.name === 'SequelizeUniqueConstraintError') {
		res.status(400).json({
			message: 'Invalid Input',
			errors: ['Email already registered']
		})
	} else if (err.name === 'Invalid User') {
		res.status(400).json({
			message: 'Invalid Input',
			errors: ['Email/Password combination not match']
		})
	} else if (err.name === 'Unauthorized') {
		res.status(401).json({
			message: 'Unauthorized',
			errors: ['You are unauthorized']
		})
	} else if (err.name === 'JsonWebTokenError') {
		res.status(401).json({
			message: 'Invalid Credential',
			errors: ['Please login!']
		})
	} else if (err.name === 'PageNotFound') {
		let { model } = err;
		res.status(404).json({
			message: `${model} Not Found`,
			errors: [`The ${model} you are looking for is not found`]
		})
		
	} else {
		// res.status(err.status || 500).json(err || 'Internal Server Error');
		console.log(err);
		res.status(err.status || 500).json(err);
	}
}