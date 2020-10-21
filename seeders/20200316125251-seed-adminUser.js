'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email : 'admin@admin.com',
      password : hashPassword('password'),
      role : 'admin',
      createdAt : new Date(),
      updatedAt: new Date ()
  }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    
  }
};
