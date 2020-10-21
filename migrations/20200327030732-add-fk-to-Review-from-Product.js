'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Reviews', ['ProductId'], {
      type: 'foreign key',
      name: 'custom_fkey_ProductId',
      references: { //Required field
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint ('Reviews', 'custom_fkey_ProductId')
  }
};
