'use strict';
let sampleProducts = [
  {
    name: "Nissin Cup Noodle Chicken Flavor",
    category: "food",
    image_url: "https://img.okezone.com/content/2020/01/27/481/2159096/cegah-peredaran-obat-ilegal-rempah-dan-jamu-tradisional-bisa-jadi-solusi-gYQvd8AErO.jpg",
    price: 10000,
    stock: 5000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Enervon-C 30 Tablets Bottle",
    category: "supplements",
    image_url: "https://img.okezone.com/content/2020/01/27/481/2159096/cegah-peredaran-obat-ilegal-rempah-dan-jamu-tradisional-bisa-jadi-solusi-gYQvd8AErO.jpg",
    price: 30000,
    stock: 5000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Panadol Cold & Flu Tablet Strip",
    category: "medicine",
    image_url: "https://img.okezone.com/content/2020/01/27/481/2159096/cegah-peredaran-obat-ilegal-rempah-dan-jamu-tradisional-bisa-jadi-solusi-gYQvd8AErO.jpg",
    price: 15000,
    stock: 5000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Tolak Angin Sachet Box",
    category: "supplements",
    image_url: "https://img.okezone.com/content/2020/01/27/481/2159096/cegah-peredaran-obat-ilegal-rempah-dan-jamu-tradisional-bisa-jadi-solusi-gYQvd8AErO.jpg",
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
