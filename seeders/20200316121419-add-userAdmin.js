'use strict';
const {encrypt} = require('../helpers/helper')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let user = {email:'admin@mail.com',password:'admin'}
    encrypt(user)
   return queryInterface.bulkInsert('Users',[{
      email:user.email,
      password:user.password,
      isAdmin:true,
      createdAt:new Date(),
      updatedAt:new Date()
   }])
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Users', null, {});
  }
};
