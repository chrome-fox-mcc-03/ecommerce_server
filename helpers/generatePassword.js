'use strict'

const bcrypt = require('bcryptjs');
const rawSalt = process.env.SALT;

const generatePassword = (password) => {
    const salt = bcrypt.genSaltSync(+rawSalt)
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = { generatePassword, comparePassword }