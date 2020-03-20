'use strict';

let data = [{
    name: 'Rambutan Rapiah',
    description: 'Rambutan Rapiah kecil tetapi manis, harga untuk 2 ikat',
    image_url: 'https://i.imgur.com/0jEmiwl.jpg',
    price: 40000,
    stock: 10,
    category: 'Lokal',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Anggur Red Globe USA',
    description: 'harga tertera untuk 1kg',
    image_url: 'https://i.imgur.com/jjrJ1tT.jpg',
    price: 45000,
    stock: 5,
    category: 'Import',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Mangga Harum Manis',
    description: 'harga tertera per pack, Isi 0.9 – 1.1 kilogram (2 – 3 Pcs)',
    image_url: 'https://i.imgur.com/ZiKbwjf.jpg',
    price: 60000,
    stock: 10,
    category: 'Lokal',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Durian Frozen',
    description: 'harga tertera per pack, isi kurang lebih isi 10 atau 1 kg',
    image_url: 'https://i.imgur.com/5dAvg23.jpg',
    price: 85000,
    stock: 10,
    category: 'Other',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Pepaya California',
    description: 'harga tertera untuk 1 - 1,5 kg per pcs',
    image_url: 'https://i.imgur.com/PFCE6Zi.jpg',
    price: 85000,
    stock: 10,
    category: 'Import',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};