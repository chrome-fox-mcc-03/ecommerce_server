'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'bambank',
      email: "bambank@mail.com",
      password: "$2y$10$BJpBaP2w5a5OqMZzbw.KUuhrr1JQx08FgYJT3vNg/6D56E6j.EL4O",
      role: true,
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
