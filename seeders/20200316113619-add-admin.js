'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [{
        email: "admin@admin.com",
        password: hashPassword('qweqwe'),
        fullname: "Andreas Anggara",
        isAdmin: true
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
