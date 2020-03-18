'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [
      {
        name: "Tolak angin",
        price: "20000",
        stock: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Wedank",
        price: "20000",
        stock: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Panadol",
        price: "20000",
        stock: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Decolgen",
        price: "20000",
        stock: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Products', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
