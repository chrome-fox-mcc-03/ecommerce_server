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
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ryzen 7 3700X",
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/7/12/9126088/9126088_8651ddde-6f8b-4a39-adc8-240cebd68aa3_700_700',
        price: 4799000,
        description: "Ryzen 7 3700X",
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ryzen 3 2200G",
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/2/22/9126088/9126088_24b71139-a855-41cf-9e03-62b12d772258_700_594.jpg.webp',
        price: 1165000,
        description: "Ryzen 3 2200G",
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Intel i9 9900k",
        image_url: 'https://static.bmdstatic.com/pk/product/medium/5c872ed299589.jpg',
        price: 8800000,
        description: "Intel i9 9900k",
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Intel i5 9400f",
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/29/7701906/7701906_462f5461-7e8e-456b-8181-529d16959607_1500_1500.jpg',
        price: 2189000,
        description: "Intel i5 9400f",
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "NVIDIA Titan RTX",
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/71OpiCVK%2B0L._AC_SL1500_.jpg',
        price: 35000000,
        description: "NVIDIA Titan RTX Graphics Card",
        stock: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "MSI Radeon VII 16GB",
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/3/25/863736/863736_edef21fe-917d-48cb-a4eb-dc615c4bd1f0_1024_820.png',
        price: 12385000,
        description: "MSI Radeon VII 16GB",
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Logitech G502 Wireless",
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/10/23/529659163/529659163_458c4229-2920-4e47-8e9a-663abf9fb112.jpg',
        price: 2000000,
        description: "Logitech G502 Wireless Lightspeed Hero Sensor Gaming Mouse",
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Logitech G402",
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/12/2/1996720/1996720_f0282a06-e502-46ba-a995-1066be6ca203_320_404.png',
        price: 475000,
        description: "Logitech G402 Gaming Mouse - Hyperion Fury",
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Logitech G512 Carbon",
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/2/1157156/1157156_6dcdd0fd-7b6b-4c51-b18c-187ec7e9431d.jpg',
        price: 1650000,
        description: "Logitech G512 Carbon RGB Gaming Mechanical Keyboard",
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Logitech G Pro X TKL Keyboard",
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/10/4/308701/308701_78c9023a-e4aa-4e2d-9b10-cfc88b01f2b6_1280_1280',
        price: 1950000,
        description: "Logitech G Pro X TKL Mechanical Gaming Keyboard GX BLUE",
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Logitech G903 Wireless",
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/10/24/429467903/429467903_bf11dcf3-5215-47a4-b478-d92a4e3c5de6.jpg',
        price: 2100000,
        description: "Logitech G903 Lightspeed Wireless Gaming Mouse",
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});

  }
};