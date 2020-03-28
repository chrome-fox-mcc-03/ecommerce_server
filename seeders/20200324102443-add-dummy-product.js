'use strict';

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
   return queryInterface.bulkInsert('Products', [{
    name: 'Gaming Case',
    image_url: "https://cf.shopee.co.id/file/92b0f5630f91608947ff929a547d3f4a",
    price: 870000,
    stock: 65,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Gaming Ram',
    image_url: "https://cdn1.centrecom.com.au/images/upload/0058537_0.jpeg",
    price: 870000,
    stock: 65,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Gaming Keyboard',
    image_url: "https://c1.neweggimages.com/ProductImage/ABRY_1320904333833222842pear7jg3L.jpg",
    price: 870000,
    stock: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Gaming LED',
    image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/3/29/1157156/1157156_31301262-ba32-4c01-9f02-142c8f03cf5d.jpg",
    price: 8990000,
    stock: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Gaming Mouse',
    image_url: "https://images-na.ssl-images-amazon.com/images/I/81Y7hzLIf0L._AC_SX466_.jpg",
    price: 2870000,
    stock: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Gaming Chair',
    image_url: "https://blossomzones.com/wp-content/uploads/2019/04/orion.jpg",
    price: 1870000,
    stock: 65,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Products', null, {});
  }
};
