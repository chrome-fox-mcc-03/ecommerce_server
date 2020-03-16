'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addColumn('Users', 'isAdmin', Sequelize.BOOLEAN, { after: 'password' });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('Users','isAdmin',{});
  }
};
