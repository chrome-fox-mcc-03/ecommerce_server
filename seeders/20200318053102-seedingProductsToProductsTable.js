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
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T01:45:15.956Z",
            "updatedAt": "2020-02-20T01:45:15.956Z"
        },
        {
            "name": "Sweat C",
            "image_url": "https://my-test-11.slatic.net/p/f25a89b9281cb57433b80760715aa596.jpg_340x340q80.jpg_.webp",
            "price": 190000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T01:45:15.956Z",
            "updatedAt": "2020-02-20T01:45:15.956Z"
        },
        {
            "name": "Sweat D",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTpoyoBh37mh0QrGQFHqzPEPfB_wcBjwxa5cm1bDhbvCo6SzRnF",
            "price": 200000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T02:37:13.339Z",
            "updatedAt": "2020-02-20T02:37:13.339Z"
        },
        {
            "name": "Sweat E",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrATcSTZA29sMze4Hqwu4gjq8BPx2UscGQiA2SVkrbqtiwEqBD",
            "price": 150000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T02:40:30.322Z",
            "updatedAt": "2020-02-20T02:40:30.322Z"
        },
        {
            "name": "Sweat F",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCT4u6f-CPWcnzHGZSh4eyx8EsPtl6ueThRjVHhFuFN3JxQCYQ",
            "price": 180000,
            "stock": 10,
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
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 1,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        },
        {
            "name": "Jas A",
            "image_url": "https://id-test-11.slatic.net/shop/ac8c6a8d4e59c8abb143210b74a15074.jpeg",
            "price": 400000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 3,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        },
        {
            "name": "Jas B",
            "image_url": "https://images-na.ssl-images-amazon.com/images/I/51muXQ5vKyL._UL1000_.jpg",
            "price": 400000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 3,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        },
        {
            "name": "Jas C",
            "image_url": "https://cf.shopee.com.my/file/cbd5beb9b87528d6f74d2f592bdb0428",
            "price": 400000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 3,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        },
        {
            "name": "Polo A",
            "image_url": "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910004368004_1.jpg",
            "price": 400000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 2,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        },
        {
            "name": "Polo B",
            "image_url": "https://dafitistaticcl-a.akamaihd.net/p/lippi-0416-538345-1-product.jpg",
            "price": 400000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 2,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        },
        {
            "name": "Polo C",
            "image_url": "https://www.pleinoutlet.cn/on/demandware.static/-/Sites-plein-master-catalog/default/dw5acea04e/images/large/A17C-MTK1428-PJY002N_01_sf.jpg",
            "price": 400000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 2,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        },
        {
            "name": "Polo D",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR55oTZlzBnoib0OdQo8XYPh5n-3n0SC4caNc_XrnP_Wm7bIYDx",
            "price": 400000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 2,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        },
        {
            "name": "Shirt A",
            "image_url": "https://contents.mediadecathlon.com/p1484240/k$ab565f3675dbdd7e3c486175e2c16583/men-s-trekking-shirt-travel100-warm-burgundy.jpg?&f=800x800",
            "price": 400000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 4,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        },
        {
            "name": "Shirt B",
            "image_url": "https://kmd-assets.imgix.net/catalog/product/1/5/15109_fedshirt_v3_a_nd6.jpg",
            "price": 400000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 4,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        },
        {
            "name": "Shirt C",
            "image_url": "https://contents.mediadecathlon.com/p1697959/k$5d188eacca42c921de151845f253ede0/men-s-warm-trekking-travel-shirt-travel-100-green.jpg?&f=250x250",
            "price": 400000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 4,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        },
        {
            "name": "Shirt D",
            "image_url": "https://contents.mediadecathlon.com/p1484210/k$8ae4fe12797325bc4b98b6af45bc208b/chemise-randonnee-voyage-voyage-100-homme-bordeaux.jpg?&f=800x800",
            "price": 400000,
            "stock": 10,
            "description": "Lorem Ipsum Dolor Amet",
            "CategoryId": 4,
            "createdAt": "2020-02-20T02:46:14.637Z",
            "updatedAt": "2020-02-20T02:46:14.637Z"
        }
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
