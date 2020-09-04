'use strict';
const fs = require('fs')
const { hashPass } = require('./../helper/bcrypt')
const users = JSON.parse(fs.readFileSync('./users.json','utf-8'))
users.forEach(el => {
  let hashed = hashPass(el.password)
  el.password = hashed
  el.createdAt = new Date()
  el.updatedAt = new Date()
})
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
    return queryInterface.bulkInsert('Users', users, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
