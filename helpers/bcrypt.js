const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function hash(password) {
    return bcrypt.hashSync(password, salt);
}

function compare(password, dbPassword) {
    return bcrypt.compareSync(password, dbPassword);
}

module.exports = {
    hash,
    compare
};
