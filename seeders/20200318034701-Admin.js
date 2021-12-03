'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
      email: 'ulfa@mail.com',
      password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1bGZhQG1haWwuY29tIiwiaWF0IjoxNTg0NTEyNjU2fQ.G8svHhWu520sgHuUJwKMZnzA8VLgt7C4Row6RQagtso',
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'ulfa@icloud.com',
      password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1bGZhQGljbG91ZC5jb20iLCJpYXQiOjE1ODQ1MTM1ODV9.IiKbuc3gIPL8PiSZn2rx1_FjccNH2Tsz6SPxp2hOB3o',
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'faa@outlook.com',
      password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJmYWFAb3V0bG9vay5jb20iLCJpYXQiOjE1ODQ1MTgwODN9.3R8OjH1xpPpxpbC4UcPtY2iqvWyZ38b7XOSa23jOX4w',
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
