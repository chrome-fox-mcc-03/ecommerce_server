const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    encrypt: (user) => {
        let salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password,salt)
    },
    getToken: (payload) => {
        let token = jwt.sign(payload,process.env.SECRET)
        return token
    },
    comparePassword: (password,passwordDb) => {
        return bcrypt.compareSync(password,passwordDb)
    }
}