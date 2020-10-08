'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: 'Bumbu Kacang',
      image_url: 'https://cdn.idntimes.com/content-images/community/2018/06/6d7b58cd3f47ebeeeee51dd5019a273e_600x400.jpg',
      price: 10000,
      stock: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Bumbu Terasi',
      image_url: 'https://img-global.cpcdn.com/recipes/0787dac47e14d8a9/751x532cq70/sambal-terasi-tomat-goreng-foto-resep-utama.jpg',
      price: 5000,
      stock: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Bumbu Kedelai',
      image_url: 'https://img-global.cpcdn.com/recipes/e869b718dbd5cefb/1200x630cq70/photo.jpg',
      price: 8000,
      stock: 40,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Bumbu Terigu',
      image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/11/5037193/5037193_d6e35d7d-e8a6-4a72-935d-01c6ea7e3561_300_300.jpg',
      price: 9000,
      stock: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    }, ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};