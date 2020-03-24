'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: `aqua`,
        image_url: `https://assets.klikindomaret.com/share/20005835/20005835_1.jpg`,
        price: 2500,
        stock: 100,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `ades`,
        image_url: `https://assets.klikindomaret.com/share/20005835/20005835_1.jpg`,
        price: 3500,
        stock: 10,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `amidis`,
        image_url: `https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//91/MTA-4093009/amidis_amidis_600ml_1_dus_full01.jpg`,
        price: 2100,
        stock: 90,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `evian`,
        image_url: `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRVte26cEDhbRGc4Pqj-SjCuPwYtTnxyOVD1-_3LXkOxT8WQXXXkaMvZPa1lS0F07WfrXBl89g&usqp=CAc`,
        price: 500,
        stock: 60,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `equil`,
        image_url: `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSVMYhgGMvhKXCNHkVunfXATYMAUq991MECX7ODTc8-4uoCxoNvyhddISlsZd0i7YnbWRryBtu6&usqp=CAc`,
        price: 59500,
        stock: 50,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `Tesla Model X`,
        image_url: `https://s.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/788x525/quality/85/https://s.aolcdn.com/commerce/autodata/images/USC60TSS011C021001.jpg`,
        price: 1000000000,
        stock: 2,
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
