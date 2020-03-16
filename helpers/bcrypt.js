const bcrypt = require('bcryptjs')


function hashPassword (password) {
    const salt = 8
    const hashedPass = bcrypt.hashSync(password, salt)

    return hashedPass
}

function comparePassword (password, hashedPass){
    return bcrypt.compareSync(password, hashPassword)
}


module.exports = {
    hashPassword,
    comparePassword
}