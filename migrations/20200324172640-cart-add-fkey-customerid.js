'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Carts', ['CustomerId'], {
      type: 'foreign key',
      name: 'custom_fkey_cart_customerid',
      references: { //Required field
        table: 'Customers',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Carts', 'custom_fkey_cart_customerid')
  }
};
