const Axios = require('axios');

class CloudinaryController {
	static upload (req, res, next) {
		let { formData } = req.body
		Axios({
			method: 'POST',
			url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
			data: { formData }
		})
			.then(result => {
				res.status(201).json(result.secure_url)
			})
			.catch(err => {
				next(err)
			})
	}
}

module.exports = CloudinaryController