'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Products', [
      {
        name: "Ryzen 5 2400G",
        image_url: 'https://cf.shopee.co.id/file/2cbf2db0873d72ce6924c1058d2fdbbc',
        description: 'Ryzen 5 2400G',
        price: 2500000,
        stock: 5,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ryzen 7 3700X",
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/7/12/9126088/9126088_8651ddde-6f8b-4a39-adc8-240cebd68aa3_700_700',
        price: 4799000,
        description: "Ryzen 7 3700X",
        stock: 5,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ryzen 3 2200G",
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/2/22/9126088/9126088_24b71139-a855-41cf-9e03-62b12d772258_700_594.jpg.webp',
        price: 1165000,
        description: "Ryzen 3 2200G",
        stock: 5,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Intel i9 9900k",
        image_url: 'https://static.bmdstatic.com/pk/product/medium/5c872ed299589.jpg',
        price: 8800000,
        description: "Intel i9 9900k",
        stock: 5,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Intel i5 9400f",
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/29/7701906/7701906_462f5461-7e8e-456b-8181-529d16959607_1500_1500.jpg',
        price: 2189000,
        description: "Intel i5 9400f",
        stock: 5,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});

  }
};