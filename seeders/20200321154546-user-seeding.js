'use strict';

const { User } = require('../models')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return User.bulkCreate([{
      email: 'michacat@gmail.co',
      password: 'permenku',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      validate: true,
      individualHooks: true,
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});
  }
};
