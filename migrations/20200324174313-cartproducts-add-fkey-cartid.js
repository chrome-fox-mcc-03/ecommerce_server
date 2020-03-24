'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('CartProducts', ['CartId'], {
      type: 'foreign key',
      name: 'custom_fkey_cartproducts_cartid',
      references: { //Required field
        table: 'Carts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('CartProducts', 'custom_fkey_cartproducts_cartid')
  }
};
