'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('CartProducts', ['cart_id'], {
      type: 'foreign key',
      name: 'fkey_cart_cartproduct',
      references: { 
        table: 'Carts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('CartProducts', 'fkey_cart_cartitem')
  }
};
