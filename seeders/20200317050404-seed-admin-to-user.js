'use strict';

const { hashPassword } = require('../helper/bcrypt')


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'dito@mail.com',
      password: hashPassword('123456'),
      createdAt: new Date,
      updatedAt: new Date,
      Admin: true
    }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    }
  };
