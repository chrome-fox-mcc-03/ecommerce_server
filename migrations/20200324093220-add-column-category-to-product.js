'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Products', 'category', Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface. removeColumn('Products', 'category')
  }
};
