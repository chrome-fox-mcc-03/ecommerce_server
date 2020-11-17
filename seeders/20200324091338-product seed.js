'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: `Brown Sweater`,
        image_url: `https://previews.123rf.com/images/siraphol/siraphol1612/siraphol161204603/67905823-fashion-sweaters-clothing-for-winter-season-isolated-on-white-background.jpg`,
        price: 700000,
        stock: 10,
        category: 'winter',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `Red Sweater`,
        image_url: `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7tjHqnRhMAWiKAePpQfg0JUPFf9xtLnmc0k4WHkqNM8Hknkcc`,
        price: 900000,
        stock: 5,
        UserId: 1,
        category: 'winter',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `Blue Sweater`,
        image_url: `https://previews.123rf.com/images/romiri77/romiri771802/romiri77180200051/96744602-sweater-isolated-on-white-background-children-warm-pullover-winter-sweater-.jpg`,
        price: 500000,
        stock: 8,
        UserId: 1,
        category: 'winter',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `Red Sweatshirt`,
        image_url: `https://5.imimg.com/data5/KB/EU/MY-20884844/red-sweatshirt-500x500.jpg`,
        price: 600000,
        stock: 10,
        UserId: 1,
        category: 'winter',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `Turtleneck Sweater`,
        image_url: `https://www.floccaristore.com/content/images/thumbs/0004022_pilar-collo-alto-a-coste.jpeg`,
        price: 900000,
        stock: 2,
        UserId: 1,
        category: 'winter',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `Striped T-Shirt`,
        image_url: `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjo-nRl15MetkFOR-Pvsq3Cxd0554a9zLoufJSNuuhYHKHAMqg`,
        price: 5000,
        stock: 5,
        UserId: 1,
        category: 'casual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `Denim Jacket`,
        image_url: `https://image.shutterstock.com/image-photo/beautiful-trendy-blue-denim-jeans-600w-678259540.jpg`,
        price: 900000,
        stock: 3,
        UserId: 1,
        category: 'casual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `Checkered Blue Shirt`,
        image_url: `https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2836745.jpg`,
        price: 90000,
        stock: 3,
        UserId: 1,
        category: 'casual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `Woman Jeans Short`,
        image_url: `https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/4579198/300/200/m2/fpc/wm0/ei47tay64peoxqqxz9shvrlzxuzbkh7z2tjrimone9umrsrst8fzm2b4lgmnkslo-.jpg?1528520552&s=69127913220b6e639d17456fae774911`,
        price: 100000,
        stock: 3,
        UserId: 1,
        category: 'casual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `Cotton Shirt`,
        image_url: `https://i1.wp.com/www.cbclothing.com.au/wp-content/uploads/2018/08/womens.jpg?w=850&ssl=1`,
        price: 200000,
        stock: 8,
        UserId: 1,
        category: 'casual',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
},

down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
}
};
