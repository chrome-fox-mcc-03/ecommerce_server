'use strict';
const fs = require('fs')
const bcrypt = require('../helpers/bcrypt')

const dummyConverted = JSON.parse(fs.readFileSync('./dummyAdmin.json', 'utf-8'))

dummyConverted.forEach(element => {
  element.password = bcrypt.hashPassword(element.password)
  element.createdAt = new Date()
  element.updatedAt = new Date()
});


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Users', dummyConverted, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
