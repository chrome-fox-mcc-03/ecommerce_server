'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Customers', ['CartId'], {
      type: 'foreign key',
      name: 'custom_fkey_customer_cartid',
      references: { //Required field
        table: 'Carts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Customers', 'custom_fkey_customer_cartid')
  }
};
