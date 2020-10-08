'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('CartProducts', ['ProductId'], {
      type: 'foreign key',
      name: 'custom_fkey_cartproducts_productid',
      references: { //Required field
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('CartProducts', 'custom_fkey_cartproducts_productid')
  }
};
