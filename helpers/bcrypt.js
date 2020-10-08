const bcrypt = require('bcryptjs')
const SALT = bcrypt.genSaltSync(+process.env.SALT)

module.exports = {
  hash (input) {
    return bcrypt.hashSync(input, SALT)
  },

  compare (input, hash) {
    return bcrypt.compareSync(input, hash)
  }
}