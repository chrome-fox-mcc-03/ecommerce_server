const bcrypt = require('bcryptjs');

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function validatePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, validatePassword }