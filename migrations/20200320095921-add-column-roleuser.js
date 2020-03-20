'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Users', 'role', Sequelize.STRING,{
        after: 'email'
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Users', 'role');
  }
};
