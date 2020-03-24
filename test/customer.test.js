const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

afterAll((done) => {
    queryInterface.bulkDelete("Products", {})
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        })
});

beforeAll(done => {
  Book
    .create(book1)
    .then(book => {
      book1.id = book.id
      return Member.create(member1)
    })
    .then(member => {
      member1.id = member.id
      done()
    })
    .catch(err => done(err))
})

describe('user route', () => {})
