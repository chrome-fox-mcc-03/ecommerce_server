const bcrypt = require('bcryptjs')

function decrypt (password, hash) {
    var salt = bcrypt.genSaltSync(5);
    var hash = bcrypt.hashSync(value, salt);
    bcrypt.compare(password, hash, function(err, res) {
        return res

    })
}

module.exports = decrypt