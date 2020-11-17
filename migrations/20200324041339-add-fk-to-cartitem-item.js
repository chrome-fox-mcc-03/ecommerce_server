'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('CartProducts', ['product_id'], {
      type: 'foreign key',
      name: 'fkey_product_cartproduct',
      references: { 
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('CartProducts', 'fkey_product_cartproduct')
  }
};
