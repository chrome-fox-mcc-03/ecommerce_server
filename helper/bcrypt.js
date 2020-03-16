var bcrypt = require('bcryptjs');

const hashPass = (inputPass) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(inputPass, salt);
    return hash
}


module.exports = {
    hashPass
}