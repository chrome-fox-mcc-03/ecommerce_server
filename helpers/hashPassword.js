const bcrypt = require('bcryptjs');

class BcryptPass {
    static hashPassword(password) {
        const hash = bcrypt.hashSync(`${password}`, 8);
        return hash
    }

    static comparePassword(password, hash) {
       return bcrypt.compareSync(password, hash)

    }
}


module.exports = BcryptPass