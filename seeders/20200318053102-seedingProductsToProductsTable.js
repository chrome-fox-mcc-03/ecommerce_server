'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Products', [
        {
            "name": "Sweat A",
            "image_url": "https://www.bbo-store.com/wp-content/uploads/2019/02/1-29.jpg",
            "price": 200000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T01:45:15.956Z",
            "updatedAt": "2020-02-20T01:45:15.956Z"
        },
        {
            "name": "Sweat B",
            "image_url": "https://s.blanja.com/picspace/570/286266/800.800_a58fda2f71e14af7affe2a35d6b5b249.jpg?w=348",
            "price": 220000,
            "stock": 5,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T01:45:15.956Z",
            "updatedAt": "2020-02-20T01:45:15.956Z"
        },
        {
            "name": "Sweat C",
            "image_url": "https://my-test-11.slatic.net/p/f25a89b9281cb57433b80760715aa596.jpg_340x340q80.jpg_.webp",
            "price": 190000,
            "stock": 7,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T01:45:15.956Z",
            "updatedAt": "2020-02-20T01:45:15.956Z"
        },
        {
            "name": "Sweat D",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTpoyoBh37mh0QrGQFHqzPEPfB_wcBjwxa5cm1bDhbvCo6SzRnF",
            "price": 200000,
            "stock": 3,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T02:37:13.339Z",
            "updatedAt": "2020-02-20T02:37:13.339Z"
        },
        {
            "name": "Sweat E",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrATcSTZA29sMze4Hqwu4gjq8BPx2UscGQiA2SVkrbqtiwEqBD",
            "price": 150000,
            "stock": 4,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T02:40:30.322Z",
            "updatedAt": "2020-02-20T02:40:30.322Z"
        },
        {
            "name": "Sweat F",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCT4u6f-CPWcnzHGZSh4eyx8EsPtl6ueThRjVHhFuFN3JxQCYQ",
            "price": 180000,
            "stock": 5,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T02:41:39.850Z",
            "updatedAt": "2020-02-20T02:41:39.850Z"
        },
        {
            "name": "Sweat G",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgWssS6MVo62_QvO1WJ-6dG3iiYSqTSHQJKEHGbgZc2_S53PZl",
            "price": 300000,
            "stock": 11,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T02:45:28.023Z",
            "updatedAt": "2020-02-20T02:45:28.023Z"
        },
        {
            "name": "Sweat H",
            "image_url": "https://ae01.alicdn.com/kf/HTB1qzY2XdjvK1RjSspiq6AEqXXat/Machine-Gun-Kelly-2018-MGK-Rap-Setan-Musim-Gugur-Turtleneck-Sweatshirt-Wanita-Pria-Kebesaran-Fashion-Sweatshirt.jpg_q50.jpg",
            "price": 400000,
            "stock": 2,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        }
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
