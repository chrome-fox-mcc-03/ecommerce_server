'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Customers', ['email'], {
      type: 'unique',
      name: 'custom_unique_customer_email'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Customers', 'custom_unique_customer_email')
  }
};
