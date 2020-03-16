const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let dummySignUp = {
    name: 'Hannah',
    email: 'hannah@gmail.com',
    password: '123123',
    token: 'endaoiea21bnijo15391301i530j.ekfoai9lajfoea0.f0039j_#9ut39ja'
}

describe('POST /signup', () => {
    describe('success process', () => {
        test('Should send an object (token, name) with status code 201', (done) => {
            // = = = = hit server = = = = 
            request(app)
                .post('/signup')
                .send(dummySignUp)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('token', dummySignUp.token)
                    expect(res.body).toHaveProperty('name', dummySignUp.name)
                    expect(res.status).toBe(201);
                    done()
                })
        })
    })
})