const cloudinary = require('cloudinary');

class CloudinaryController {
	static upload (req, res, next) {
		const { img64 } = req.body
		cloudinary.v2.uploader.unsigned_upload(img64, 'hacktiv8', { cloud_name: process.env.CLOUDINARY_CLOUD_NAME }, (err, result) => {
			console.log(err);
			console.log(result);
		})
	}
}

module.exports = CloudinaryController