'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: "AGV Pista GPR Mugello 2017 Rossi Limited Edition - Euro Fit",
        image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/1/28/253911722/253911722_a5db9eb5-c80a-4bee-9915-1b6535507172_1080_1080.jpg",
        price: 16490000,
        stock: 5,
        TypeId: 1,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "AGV PISTA GPR ROSSI WINTER TEST 2017 TAVULLIA LIMITED EDITION",
        image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/6/26/1628747/1628747_00cadf54-bc0f-47a9-aa50-1115347937ac_959_959",
        price: 16000000,
        stock: 5,
        TypeId: 1,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "AGV K3 SV MISANO 2014",
        image_url: "https://i.ebayimg.com/images/g/ygUAAOSwrsFd8QOb/s-l640.jpg",
        price: 3400000,
        stock: 8,
        TypeId: 1,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "Visor AGV K3 SV Iridium Blue",
        image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/3/652702/652702_8bbef935-ce50-4592-be1d-fab0f2e702e4.jpg",
        price: 1199000,
        stock: 17,
        TypeId: 2,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "AGV SPOILER PISTA GP / CORSA",
        image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/10/2/0/0_0c211f72-4830-4f27-bbf9-c8a9b4a5764e_540_533.jpg",
        price: 1750000,
        stock: 20,
        TypeId: 2,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "PISTA GP RR ECE DOT LIMITED EDITION - SPECIALE",
        image_url: "https://dainese-cdn.thron.com/delivery/public/image/dainese/6ea2e117-a21a-40ad-9132-b86fbc538485/ramfdh/std/615x615/pista-gp-rr-ece.jpg",
        price: 28500000,
        stock: 2,
        TypeId: 1,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "AGV PREMIUM HELMET BAG",
        image_url: "https://dainese-cdn.thron.com/delivery/public/image/dainese/8277d869-017b-42d1-9d2a-18ad52382b1b/ramfdh/std/615x615/agv-premium-helmet-bag.jpg",
        price: 2298000,
        stock: 22,
        TypeId: 2,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "AGV K3 SV E2205 TOP - TARTARUGA",
        image_url: "https://dainese-cdn.thron.com/delivery/public/image/dainese/7c0da18a-0ad7-4645-be60-565d67b284f4/ramfdh/std/615x615/k3-sv-e2205-top.jpg",
        price: 5149000,
        stock: 7,
        TypeId: 1,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "AGV K3 SV E2205 TOP - ROSSI MISANO 2015",
        image_url: "https://dainese-cdn.thron.com/delivery/public/image/dainese/bdfb3ee8-636a-445e-9d26-856d5fa6b73d/ramfdh/std/615x615/k3-sv-e2205-top.jpg",
        price: 5149000,
        stock: 7,
        TypeId: 1,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: "AGV K3 SV E2205 MONO - MATT BLACK",
        image_url: "https://dainese-cdn.thron.com/delivery/public/image/dainese/8d5d9390-1252-448f-b674-bb393a5ea603/ramfdh/std/615x615/k3-sv-e2205-mono.jpg",
        price: 4080000,
        stock: 10,
        TypeId: 1,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
