'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Carts', 'purchase', Sequelize.BOOLEAN)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Carts', 'purchase')
  }
};
