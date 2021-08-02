var bcrypt = require('bcryptjs');

module.exports = {
	encode (pass) {
		let salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(pass, salt);
	},
	decode (pass, dbPass) {
		return bcrypt.compareSync(pass, dbPass);
	}
}