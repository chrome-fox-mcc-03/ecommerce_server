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
      },
      {
        name: 'Wafer',
        image_url: 'https://cf.shopee.co.id/file/370a8de609b016fa60222fcee0faac98',
        price: 5000,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Wafer',
        image_url: 'https://www.lifull-produk.id/bundles/assets/img/product/selamat%20wafer%20chocolate%2060gr.jpg',
        price: 5000,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Wafer',
        image_url: 'https://cdn.elevenia.co.id/g/4/4/0/5/4/6/18440546_B_V3.jpg',
        price: 5000,
        stock: 20,
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
