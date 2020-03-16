'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Products', ['store_id'], {
      type: 'foreign key',
      name: 'fkey_Products',
      references: { 
        table: 'Stores',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Products', 'fkey_Products')
  }
};
