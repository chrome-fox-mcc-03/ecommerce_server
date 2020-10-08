const bcrypt = require('bcryptjs');

function getHash(password) {
    const salt = bcrypt.genSaltSync(9);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function compareHash(strPass, dbPass) {
    return bcrypt.compareSync(strPass, dbPass);
}

module.exports = {
    getHash,
    compareHash
}