const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize


//dummy data to check whether the test working or not
let dummyData = {
    email : 'hasangundul@mail.com',
    password : 'hasan12345'
}

describe('User routes' , () => {
    //test register route
    describe(' [POST] => ( /register ) ', () => {
        test('sending object (email, id) with status code 201 ', (done) => {
            request(app)
            .post('/register')
            .send(dummyData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.body).toHaveProperty('email', 'hasan@mail.com')
                done()
            })
        })
    })
})