const bcrypt = require("bcrypt");

module.exports = {
  hashPassword(inputPassword) {
    return bcrypt.hashSync(inputPassword, Number(process.env.SALT));
  },

  checkPassword(inputPassword, hashed) {
    return bcrypt.compareSync(inputPassword, hashed);
  }
};
