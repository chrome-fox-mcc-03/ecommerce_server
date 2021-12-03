'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
      name: 'Start With Why : How Great Leaders Inspire Everyone To Take Action',
      image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
      price: 165000,
      stock: 23,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '7 Habits Of Highly Effective People',
      image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4165/9781416502494.jpg',
      price: 180000,
      stock: 40,
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      name: 'Thinking, Fast and Slow',
      image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/1410/9780141033570.jpg',
      price: 207000,
      stock: 70,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Rich Dad Poor Dad : What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!',
      image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/6126/9781612680194.jpg',
      price: 154000,
      stock: 35,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'The Power of Habit : Why We Do What We Do, and How to Change',
      image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/8479/9781847946249.jpg',
      price: 141000,
      stock: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mindset - Updated Edition : Changing The Way You think To Fulfil Your Potential',
      image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4721/9781472139955.jpg',
      price: 149000,
      stock: 87,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'The Little Prince',
      image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/8532/9781853261589.jpg',
      price: 76000,
      stock: 74,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'The Life-Changing Magic of Tidying : A simple, effective way to banish clutter forever',
      image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0919/9780091955106.jpg',
      price: 206000,
      stock: 109,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Diseases of the Heart and Their Cure',
      image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/5413/9781541348707.jpg',
      price: 158000,
      stock: 29,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
