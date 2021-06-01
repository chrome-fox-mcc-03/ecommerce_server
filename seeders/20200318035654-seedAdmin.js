'use strict';

const { hashPassword } = require('../helpers')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: "admin",
        email: "admin@mail.com",
        password: hashPassword('12345'),
        role: true,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
