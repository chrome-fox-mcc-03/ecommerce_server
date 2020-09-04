var bcrypt = require('bcryptjs');

const hashPass = (inputPass) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(inputPass, salt);
    return hash
}

const comparePass = (inputPass, hashPass) => {
    return bcrypt.compareSync(inputPass, hashPass); 
}

module.exports = {
    hashPass,
    comparePass
}