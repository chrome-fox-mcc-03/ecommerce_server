const bcrypt = require('bcryptjs')
const salt = +process.env.SALT

class Helperbcrypt {
  static hashpw (password) {
    const hash = bcrypt.hashSync(password,salt)
    return hash
  }
  static comparepw (password,hashpw){
    const pw = bcrypt.compareSync(password,hashpw)
    return pw
  }
}

module.exports = Helperbcrypt