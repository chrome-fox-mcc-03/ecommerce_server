'use strict';
const { encode } = require('../helpers/bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
    {
      name: 'Admin1',
      email: 'admin1@email.com',
      password: encode('qwe'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Admin2',
      email: 'admin2@email.com',
      password: encode('qwe'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Customer1',
      email: 'customer1@email.com',
      password: encode('qwe'),
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Customer2',
      email: 'customer2@email.com',
      password: encode('qwe'),
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
