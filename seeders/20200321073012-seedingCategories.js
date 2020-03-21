'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Categories', [{
        name: 'Sweater'
      }, {
        name: 'Polo'
      }, {
        name: 'Jas'
      }, {
        name: 'Shirt'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
