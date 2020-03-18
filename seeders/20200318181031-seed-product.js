'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Products', [{
			name: 'Jam Tangan 1',
			description: 'Ini adalah deskripsi dari sebuah jam tangan',
			stock: 10,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=989&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 2',
			description: 'Ini adalah deskripsi dari sebuah jam tangan',
			stock: 10,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1564088057637-4915616a8a38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 3',
			description: 'Ini adalah deskripsi dari sebuah jam tangan',
			stock: 10,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 4',
			description: 'Ini adalah deskripsi dari sebuah jam tangan',
			stock: 10,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1570713832478-2b8f9881f65c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 5',
			description: 'Ini adalah deskripsi dari sebuah jam tangan',
			stock: 10,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1562986406-60c6ec23a800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 6',
			description: 'Ini adalah deskripsi dari sebuah jam tangan',
			stock: 10,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1562157646-4303261af91e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 7',
			description: 'Ini adalah deskripsi dari sebuah jam tangan',
			stock: 10,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1517509431502-18df58a7758e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 8',
			description: 'Ini adalah deskripsi dari sebuah jam tangan',
			stock: 10,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 9',
			description: 'Ini adalah deskripsi dari sebuah jam tangan',
			stock: 10,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1504282101952-7fb308d9ddf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 10',
			description: 'Ini adalah deskripsi dari sebuah jam tangan',
			stock: 10,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 11',
			description: 'Ini adalah deskripsi dari sebuah jam tangan',
			stock: 10,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1451859757691-f318d641ab4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 12',
			description: 'Ini adalah deskripsi dari sebuah jam tangan',
			stock: 10,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1526492664619-72c7c4c62835?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Products', null, {});
	}
}
