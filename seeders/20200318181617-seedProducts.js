'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: "AGV Pista GPR Mugello 2017 Rossi Limited Edition - Euro Fit",
        image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/1/28/253911722/253911722_a5db9eb5-c80a-4bee-9915-1b6535507172_1080_1080.jpg",
        price: 16490000,
        stock: 1,
        TypeId: 1,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "AGV PISTA GPR ROSSI WINTER TEST 2017 TAVULLIA LIMITED EDITION",
        image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/6/26/1628747/1628747_00cadf54-bc0f-47a9-aa50-1115347937ac_959_959",
        price: 16000000,
        stock: 3,
        TypeId: 1,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "AGV K3 SV MISANO 2014",
        image_url: "https://i.ebayimg.com/images/g/ygUAAOSwrsFd8QOb/s-l640.jpg",
        price: 3400000,
        stock: 5,
        TypeId: 1,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "Visor AGV K3 SV Iridium Blue",
        image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/3/652702/652702_8bbef935-ce50-4592-be1d-fab0f2e702e4.jpg",
        price: 1199000,
        stock: 10,
        TypeId: 2,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "AGV SPOILER PISTA GP / CORSA",
        image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/10/2/0/0_0c211f72-4830-4f27-bbf9-c8a9b4a5764e_540_533.jpg",
        price: 1750000,
        stock: 6,
        TypeId: 2,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
