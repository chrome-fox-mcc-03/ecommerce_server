const app = require('./../app')
const request = require('supertest')
const { sequelize } = require('./../models')
const { queryInterface } = sequelize
const { makeToken } = require('./../helper/jwt')
const {  User, Product } = require('./../models')

let data = {
	name: 'pizza',
	image_url: 'https://google.com',
	price: 80000,
	stock: 13
}
let product = {}

let token = ''

describe('Product routes', () => {
	beforeAll(done => {
		User.create({
			email: 'joko@gmail.com',
			password: '12345',
			name: 'joko',
			role: 'admin'
		})
			.then(response => {
				const payload = {
					id: response.id,
					email: response.email,
					name: response.name,
					role: response.role
				}
				token = makeToken(payload)
				done()
			})
			.catch(err => console.log(err))
	})
	afterAll(done => {
		queryInterface.bulkDelete('Users', {})
			.then(_ => {
				done()
			})
			.catch(err => console.log(err))
	})
	describe('POST /products', () => {
		describe('success', () => {
			test('send object (name,image_url,price,stock) with 201 status', (done) => {
				request(app)
					.post('/products')
					.set({ token })
					.send(data)
					.end((err, res) => {
						expect(err).toBe(null)
						expect(res.body).toHaveProperty('id', expect.any(Number))
						expect(res.body).toHaveProperty('name', data.name)
						expect(res.body).toHaveProperty('image_url', data.image_url)
						expect(res.body).toHaveProperty('price', data.price)
						expect(res.body).toHaveProperty('stock', data.stock)
						expect(res.status).toBe(201)
						done()
					})
			})
		})
		describe('fail', () => {
			describe('failed because token not provided', () => {
				test('send error not authenticated with status of 404', done => {
					request(app)
						.post('/products')
						.send(data)
						.end((err, res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'You are not authenticated')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(404)
							done()
						})
				})
			})
			describe('failed because name is not provided', () => {
				test('send error name must be filled with status of 400', done => {
					const noName = { ...data }
					delete noName.name
					request(app)
						.post('/products')
						.set({ token })
						.send(noName)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'name must be filled')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('failed because image url format is not right', () => {
				test('send error image url format with status of 400', done => {
					const wrongUrl = { ...data }
					wrongUrl.image_url = 'ayam goreng'
					request(app)
						.post('/products')
						.set({ token })
						.send(wrongUrl)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'image url must be in url format')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('failed because image url is not provided', () => {
				test('send error image url must be filled with status of 400', done => {
					const noUrl = { ...data }
					delete noUrl.image_url
					request(app)
						.post('/products')
						.set({ token })
						.send(noUrl)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'image url must be filled')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('failed because price is not a number', () => {
				test('send error price must be number with status of 400', done => {
					const notNumber = { ...data }
					notNumber.price = 'aa'
					request(app)
						.post('/products')
						.set({ token })
						.send(notNumber)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'price must be number')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('failed because price is less than 0', () => {
				test('send error minimum price value is zero with status of 400', done => {
					const wrongPrice = { ...data }
					wrongPrice.price = -3
					request(app)
						.post('/products')
						.set({ token })
						.send(wrongPrice)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'minimum price value is zero')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('failed because stock is not a number', () => {
				test('send error stock must be number with status of 400', done => {
					const notNumber = { ...data }
					notNumber.stock = 'aa'
					request(app)
						.post('/products')
						.set({ token })
						.send(notNumber)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'stock must be number')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('failed because stock is less than 0', () => {
				test('send error minimum stock value is zero with status of 400', done => {
					const wrongStock = { ...data }
					wrongStock.stock = -3
					request(app)
						.post('/products')
						.set({ token })
						.send(wrongStock)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'minimum stock value is zero')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
		})
	})
	describe('GET /products', () => {
		describe('success', () => {
			test('send object (id,name,image_url,price,stock) with status 200', done => {
				request(app)
					.get('/products')
					.set({ token })
					.end((err,res) => {
						expect(err).toBe(null)
						expect(res.body).toStrictEqual(expect.any(Array))
						expect(res.body.length).toBeGreaterThan(0)
						expect(res.status).toBe(200)
						done()
					})
			})
		})
		describe('fail', () => {
			describe('send error because token is not provided', () => {
				test('send error you are not authenticated', done => {
					request(app)
						.get('/products')
						.end((err, res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'You are not authenticated')
							expect(res.body.errors).toStrictEqual(expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(404)
							done()
						})
				})
			})
		})
	})
	beforeEach(done => {
		Product.create({
			name: data.name,
			image_url: data.image_url,
			price: data.price,
			stock: data.stock
		})
			.then(result => {
				product = result
				done()
			})
			.catch(err => {
				console.log(err)
			})
	})
	afterEach(done => {
		queryInterface.bulkDelete('Products', {})
			.then(_ => {
				done()
			})
			.catch(err => console.log(err))
	})
	describe('GET /products/:id', () => {
		describe('success', () => {
			test('send product type object with the right id', (done) => {
				const id = product.id
				request(app)
					.get(`/products/${id}`)
					.set({ token })
					.end((err, res) => {
						expect(err).toBe(null)
						expect(res.body).toHaveProperty('id', id)
						expect(res.body).toHaveProperty('name', product.name)
						expect(res.body).toHaveProperty('image_url', product.image_url)
						expect(res.body).toHaveProperty('image_url', product.image_url)
						expect(res.body).toHaveProperty('price', product.price)
						expect(res.body).toHaveProperty('stock', product.stock)
						expect(res.status).toBe(200)
						done()
					})
			})
		})
		describe('fail', () => {
			describe('test with no authentification', () => {
				test('send error jwt not provided', (done) => {
					const id = product.id
					request(app)
						.get(`/products/${id}`)
						.end((err, res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'You are not authenticated')
							expect(res.body.errors).toStrictEqual(expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(404)
							done()
						})
				})
			})
			describe('test with no product found', () => {
				test('send error no product found', (done) => {
					const id = product.id + 1
					request(app)
						.get(`/products/${id}`)
						.set({ token })
						.end((err, res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'product not found')
							expect(res.body.errors).toStrictEqual(expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('test with invalid id', () => {
				test('send error database error', (done) => {
					const id = 'invalid id'
					request(app)
						.get(`/products/${id}`)
						.set({ token })
						.end((err, res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'Database Error')
							expect(res.body.errors).toStrictEqual(expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(500)
							done()
						})
				})
			})
		})
	})
	describe('PUT /products/:id', () => {
		describe('success', () => {
			test('send object (name,image_url,price,stock) with 201 status', (done) => {
				const id = product.id 
				const toUpdate = {
					name: 'keyboard',
					image_url: 'https://yahoo.com',
					price: 800000,
					stock: 1
				}
				request(app)
					.put(`/products/${id}`)
					.set({ token })
					.send(toUpdate)
					.end((err, res) => {
						expect(err).toBe(null)
						expect(res.body).toHaveProperty('id', id)
						expect(res.body).toHaveProperty('name', toUpdate.name)
						expect(res.body).toHaveProperty('image_url', toUpdate.image_url)
						expect(res.body).toHaveProperty('price', toUpdate.price)
						expect(res.body).toHaveProperty('stock', toUpdate.stock)
						expect(res.status).toBe(201)
						done()
					})
			})
		})
		describe('fail', () => {
			describe('test with no product found', () => {
				test('send error no product found', (done) => {
					const id = product.id + 1
					const toUpdate = {
						name: 'keyboard',
						image_url: 'https://yahoo.com',
						price: 800000,
						stock: 1
					}
					request(app)
						.put(`/products/${id}`)
						.set({ token })
						.send(toUpdate)
						.end((err, res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'product not found')
							expect(res.body.errors).toStrictEqual(expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('test with invalid id', () => {
				test('send error database error', (done) => {
					const id = 'aa'
					const toUpdate = {
						name: 'keyboard',
						image_url: 'https://yahoo.com',
						price: 800000,
						stock: 1
					}
					request(app)
						.put(`/products/${id}`)
						.set({ token })
						.send(toUpdate)
						.end((err, res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'Database Error')
							expect(res.body.errors).toStrictEqual(expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(500)
							done()
						})
				})
			})
			describe('failed because token not provided', () => {
				test('send error not authenticated with status of 404', done => {
					const id = product.id 
					const toUpdate = {
						name: 'keyboard',
						image_url: 'https://yahoo.com',
						price: 800000,
						stock: 1
					}
					request(app)
						.put(`/products/${id}`)
						.send(toUpdate)
						.end((err, res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'You are not authenticated')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(404)
							done()
						})
				})
			})
			describe('failed because name is not provided', () => {
				test('send error name must be filled with status of 400', done => {
					const id = product.id 
					const toUpdate = {
						name: '',
						image_url: 'https://yahoo.com',
						price: 800000,
						stock: 1
					}
					request(app)
						.put(`/products/${id}`)	
						.set({ token })
						.send(toUpdate)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'name must be filled')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('failed because image url format is not right', () => {
				test('send error image url format with status of 400', done => {
					const id = product.id 
					const toUpdate = {
						name: 'keyboard',
						image_url: 'https://yahoo.com',
						price: 800000,
						stock: 1
					}
					toUpdate.image_url = 'tidak benar'
					request(app)
						.put(`/products/${id}`)	
						.set({ token })
						.send(toUpdate)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'image url must be in url format')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('failed because image url is not provided', () => {
				test('send error image url must be filled with status of 400', done => {
						const id = product.id 
						const toUpdateNoUrl = {
							name: 'keyboard',
							image_url: null,
							price: 800000,
							stock: 1
						}
						request(app)
						.put(`/products/${id}`)
						.set({ token })
						.send(toUpdateNoUrl)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'image url must be filled')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('failed because price is not a number', () => {
				test('send error price must be number with status of 400', done => {
					const id = product.id 
					const toUpdate = {
						name: 'keyboard',
						image_url: 'https://yahoo.com',
						price: 800000,
						stock: 1
					}
					toUpdate.price = 'aa'
					request(app)
						.put(`/products/${id}`)
						.set({ token })
						.send(toUpdate)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'price must be number')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('failed because price is less than 0', () => {
				test('send error minimum price value is zero with status of 400', done => {
					const id = product.id 
					const toUpdate = {
						name: 'keyboard',
						image_url: 'https://yahoo.com',
						price: 800000,
						stock: 1
					}
					toUpdate.price = -3
					request(app)
						.put(`/products/${id}`)
						.set({ token })
						.send(toUpdate)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'minimum price value is zero')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('failed because stock is not a number', () => {
				test('send error stock must be number with status of 400', done => {
					const id = product.id 
					const toUpdate = {
						name: 'keyboard',
						image_url: 'https://yahoo.com',
						price: 800000,
						stock: 1
					}
					toUpdate.stock = 'ff'
					request(app)
						.put(`/products/${id}`)
						.set({ token })
						.send(toUpdate)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'stock must be number')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('failed because stock is less than 0', () => {
				test('send error minimum stock value is zero with status of 400', done => {
					const id = product.id 
					const toUpdate = {
						name: 'keyboard',
						image_url: 'https://yahoo.com',
						price: 800000,
						stock: 1
					}
					toUpdate.stock = -2
					request(app)
						.put(`/products/${id}`)
						.set({ token })
						.send(toUpdate)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'minimum stock value is zero')
							expect(res.body).toHaveProperty('errors', expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
		})
	})
	describe('DELETE /products/:id', () => {
		describe('success', () => {
			test('send deleted object with status of 203', (done) => {
				const id = product.id
				request(app)
					.delete(`/products/${id}`)
					.set({ token })
					.end((err, res) => {
						expect(err).toBe(null)
						expect(res.body).toHaveProperty('id', product.id)
						expect(res.body).toHaveProperty('name', product.name)
						expect(res.body).toHaveProperty('image_url', product.image_url)
						expect(res.body).toHaveProperty('price', product.price)
						expect(res.body).toHaveProperty('stock', product.stock)
						expect(res.status).toBe(203)
						done()
					})
			})
		})
		describe('fail', () => {
			describe('error because jwt not provided', () => {
				test('send error because not authenticated', (done) => {
					const id = product.id
					request(app)
						.delete(`/products/${id}`)
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'You are not authenticated')
							expect(res.body.errors).toStrictEqual(expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(404)
							done()
						})
				})
			})
			describe('error because products not found', () => {
				test('send error because product not found', (done) => {
					const id = product.id + 1
					request(app)
						.delete(`/products/${id}`)
						.set({ token })
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'product not found')
							expect(res.body.errors).toStrictEqual(expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(400)
							done()
						})
				})
			})
			describe('error because id not valid', () => {
				test('send error because id not valid', (done) => {
					const id = 'aa'
					request(app)
						.delete(`/products/${id}`)
						.set({ token })
						.end((err,res) => {
							expect(err).toBe(null)
							expect(res.body).toHaveProperty('message', 'Database Error')
							expect(res.body.errors).toStrictEqual(expect.any(Array))
							expect(res.body.errors.length).toBe(1)
							expect(res.status).toBe(500)
							done()
						})
				})
			})
		})
	})
})