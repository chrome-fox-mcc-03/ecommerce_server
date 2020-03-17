const bcrypt = require('bcryptjs')


function hashPassword (password) {
    const salt = 8
    const hashedPass = bcrypt.hashSync(password, salt)

    return hashedPass
}

function comparePassword (password, hashedPass){
    // console.log(password, hashedPass);
    
    return bcrypt.compareSync(password, hashedPass)
}


module.exports = {
    hashPassword,
    comparePassword
}