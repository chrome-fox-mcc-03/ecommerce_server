const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let dummySignUp = {
    name: 'Ace',
    email: 'ace@gmail.com',
    password: '123123'
}

describe('POST /signup', () => {
    describe('success process', () => {
        test('Should send an object (token, name) with status code 201', (done) => {
            // = = = = hit server = = = = 
            request(app)
                .post('/signup')
                .send(dummySignUp)
                .end((err, res) => {
                    console.log('= = = = = >', res.body);
                    
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('token', expect.any(String))
                    expect(res.body).toHaveProperty('currentUser', expect.any(String))
                    expect(res.status).toBe(201);
                    done()
                })
        })
    })
})