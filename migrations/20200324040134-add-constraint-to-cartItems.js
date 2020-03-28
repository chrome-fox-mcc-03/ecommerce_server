'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.addConstraint('CartItems', ['CartId'], {
    type: 'foreign key',
    name: 'CartId',
    references: { //Required field
      table: 'Carts',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.removeConstraint('Carts', 'CartId', null)
  }
};
