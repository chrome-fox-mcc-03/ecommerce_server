const bcrypt = require('bcryptjs');

function hashPassword(password) {
    console.log('masuk BCRYPT');
    
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    console.log('=========='. hashed);
    
    return hashed;
}

function comparePassword(password, hashed) {
    return bcrypt.compareSync(password, hashed);
}

module.exports = {
    hashPassword,
    comparePassword
};
