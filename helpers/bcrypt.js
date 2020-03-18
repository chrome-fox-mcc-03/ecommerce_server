const bcrypt = require('bcrypt')

module.exports = class Bcrypt{
  static hash(password) {
    const salt = bcrypt.genSaltSync(+process.env.SALT)
    return bcrypt.hashSync(password, salt)
  }

  static comparing(reqBodyPassword, databasePassword) {
    return bcrypt.compareSync(reqBodyPassword, databasePassword)
  }
}