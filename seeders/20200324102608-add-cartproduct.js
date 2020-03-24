'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CartProducts', [{
      ProductId: 2,
      quantity: 2,
      CartId: 2,
      isPaid: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 3,
      quantity: 1,
      CartId: 2,
      isPaid: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CartProducts', null, {});
  }
};
