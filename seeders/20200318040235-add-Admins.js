'use strict';
//Default Password Admin = "tralala"
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert('Users', [{
          Email: 'Admin01@mail.com',
          Password: "$2a$05$XbJTk2P908pFY19dY0x2NO12S/DlaVqEmMU5.bazHdTbniYaFZ0Em",
          Role: "Admin",
          createdAt: "NOW()",
          updatedAt: "NOW()"
        }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Users', null, {});
  }
};
