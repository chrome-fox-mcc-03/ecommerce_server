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
    //delete all tested data everytime you run the test file
    afterEach((done) => {
        queryInterface.bulkDelete('Users', {})
        .then(_ => {
            done()
        }).catch((err) => {
            done(err)
        });
    })
    //test register route
    describe('POST /register', () => {
        test('sending object (email, id) with status code 201 ', (done) => {
            
            request(app)
            .post('/register')
            .send(dummyData)
            .end((err, res) => {
                // console.log(res);
                expect(err).toBe(null)
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty('email', dummyData.email)
                expect(res.body).toHaveProperty('id', expect.any(Number))
                //done() must be included to break the process
                done()
            })
        })
    })

    
})