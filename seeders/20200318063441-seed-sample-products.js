'use strict';
let sampleProducts = [
  {
    name: "Nissin Cup Noodle Chicken Flavor",
    image_url: "image.url",
    price: 10000,
    stock: 5000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Enervon-C 30 Tablets Bottle",
    image_url: "image.url",
    price: 30000,
    stock: 5000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Panadol Cold & Flu Tablet Strip",
    image_url: "image.url",
    price: 15000,
    stock: 5000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Tolak Angin Sachet Box",
    image_url: "image.url",
    price: 20000,
    stock: 5000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert("Products", sampleProducts, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete("Products", null, {})
  }
};
