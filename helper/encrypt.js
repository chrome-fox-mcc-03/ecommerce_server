const bcrypt = require('bcryptjs')

function encrypt (value) {
    var salt = bcrypt.genSaltSync(5);
    var hash = bcrypt.hashSync(value, salt);
    return hash
}

module.exports = encrypt