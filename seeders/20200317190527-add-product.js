'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [
      {
        name: 'Hand Sanitizer',
        image_url: 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/d/e/dettol_instant_hand_sanitizer_pump_200ml.jpg',
        price: 35000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sampo',
        image_url: 'https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/beauty/Head_and_Shoulders_Supreme_Smooth_Shampo_Anti_Ketombe/Head_and_Shoulders_Supreme_Smooth_Shampo_Anti_Ketombe_L_1.jpg',
        price: 20000,
        stock: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Masker',
        image_url: 'https://media.suara.com/pictures/480x260/2020/02/29/45914-ilustrasi-masker.jpg',
        price: 10000,
        stock: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Detergen',
        image_url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//90/MTA-3322188/daia_detergen-daia-620gr-bungkus-softener_full02.jpg',
        price: 30000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pembersih Wajah',
        image_url: 'https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/beauty/Clean_and_Clear_Foaming_Face_Wash/Clean_and_Clear_Foaming_Face_Wash_L_1.jpg',
        price: 15000,
        stock: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
   return queryInterface.bulkInsert('Products',data,{})
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Products', null, {});
  }
};
