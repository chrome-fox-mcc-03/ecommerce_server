const productController = require("../controller/productcontroller")
const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

//Access_Token didapat dari hasil postman di server hasil login,untuk testing bisa login via postman dulu
// baru setelah itu baru diambil access token hasil login dan dicopas ke access token dibawha ini untuk jalan
let Access_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IkFkbWluMDFAbWFpbC5jb20iLCJpZCI6NjQsIlJvbGUiOiJBZG1pbiIsImlhdCI6MTU4NDUxMTk3M30.Wtf9NVs5tU9_iJoTCTkuQ4CeNhj9k7gb-r2mCb5jN80"
let data = {
    Name: "Barang-c",
    Image_Url: "test.jpg",
    Price: "1000",
    Stock: '100'
}


describe('Product Routes', () => {
    
    //Bulkdelete afterEach di comment untuk testing delete/update(karena ngapus table setelah testing)
    // afterEach((done) => {
    //     queryInterface.bulkDelete('Products', {})
    //     .then(function() {
    //         done()
    //     })
    //     .catch(function(err) {
    //         done(err)
    //     })
    // })
    

    describe('Product Create Test', () => {
        describe('Testing Create product', () => {
            test('Create Item', (done) => {
                request(app)
                    .post('/products/create')
                    .set("Access_Token", Access_Token)
                    .send(data)
                    .end(function(err, res) {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty("Name", data.Name)
                        expect(res.body).toHaveProperty("Price", 1000)
                        expect(res.body).toHaveProperty("Stock", 100)
                        expect(res.body).toHaveProperty("Image_Url", data.Image_Url)

                        done()
                    })
            });
        });
    });

    describe('Product Create Err test', () => {
        test('Create Error ', (done) => {
            let itemTest = {...data}
            delete itemTest.Name
            request(app)
            .post('/products/create')
            .set("Access_Token", Access_Token)
            .send(itemTest)
            .end(function(err, res) {
                expect(err).toBe(null)
                expect(res.body).toHaveProperty('message', "Bad Request")
                expect(res.body).toHaveProperty('errors', ["Please Fill The Item Name"])
                done()
            })            
        });
        
    });

    describe('Product Update Test', () => {
        test('Update Items', (done) => {
            let updateItems = {...data}
            updateItems.Name = "YEEET...BOIIIIIII"
            request(app)
            .put('/products/update/1')
            .set("Access_Token", Access_Token)
            .send(updateItems)
            .end(function(err, res) {
                expect(err).toBe(null)
                expect(res.body).toHaveProperty("message", "Berhasil Update")
                done()
                
            })
            
        });
    });

    describe('Product Update test', () => {
        test('Update Without Name', (done) => {
            let updateNoName = {...data}
            delete updateNoName.Name
            request(app)
            .put('/products/update/10')
            .set("Access_Token", Access_Token)
            .send(updateNoName)
            .end(function(err, res) {
                expect(err).toBe(null)
                expect(res.body).toHaveProperty('message', "Berhasil Update")
                done()
            })
            
        });        
    });

    describe('Product Delete Test', () => {
        test('Delete Product', (done) => {
            request(app)
            .delete('/products/delete/11')
            .set('Access_Token', Access_Token)
            .end(function(err, res) {
                expect(err).toBe(null)
                expect(res.body).toHaveProperty('message', "Berhasil Delete")
                done()
            })
            
        });
        
    });

    describe('Product Delete Number Not Exist Test', () => {
        test('Delete Test Number Not Exist', (done) => {
            request(app)
            .delete('/products/delete/10000')
            .set('Access_Token', Access_Token)
            .end(function(err, res) {
                expect(err).toBe(null)
                expect(res.body).toHaveProperty("message", "Berhasil Delete")
                done()
            })
        });
    });




});