const bcrypt = require('bcryptjs');

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(8) ;
    return bcrypt.hashSync(password, salt)
}

function comparePassword(password, storedPassword) {
    return bcrypt.compareSync(password, storedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}