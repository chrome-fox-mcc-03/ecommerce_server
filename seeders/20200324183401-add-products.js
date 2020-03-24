'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'product test 01',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 02',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 03',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 04',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 05',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 06',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 07',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 08',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 09',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 10',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 11',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 12',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 13',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 14',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 15',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 16',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 17',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 18',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 19',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 20',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'product test 21',
        image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
        price: '1000',
        stock: '1',
        UserId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
