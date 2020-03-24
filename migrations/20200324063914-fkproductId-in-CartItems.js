'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('CartItems', ['ProductId'], {
      type: 'foreign key',
      name: 'FK-productId-CartItems',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeConstraint('Carts', 'FK-productId-CartItems')
  }
};
