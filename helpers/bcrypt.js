const bcrypt = require('bcryptjs')

module.exports = {
  hashPassword : function(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash  
  },
  checkPassword : function(inputPassword, hash) {
    return bcrypt.compareSync(inputPassword, hash); 
  }
}