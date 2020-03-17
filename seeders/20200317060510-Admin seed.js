'use strict';
const { hashPassword } = require('../helpers/bcrypt')
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        email: 'admin@admin.com',
        password: hashPassword('qweqwe'),
        role: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('People', null, {});
  }
};
