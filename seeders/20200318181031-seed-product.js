'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		let description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae enim blandit nibh consectetur aliquet sed at quam. Fusce nec dignissim odio, eu luctus diam. Duis maximus nunc elit, ac dapibus risus venenatis maximus.'

		return queryInterface.bulkInsert('Products', [{
			name: 'Sepatu',
			description,
			stock: 20,
			price: 5000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=643&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Rucksak',
			description,
			stock: 30,
			price: 15000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=669&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Air Pod',
			description,
			stock: 35,
			price: 25000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 4',
			description,
			stock: 55,
			price: 35000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1570713832478-2b8f9881f65c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 5',
			description,
			stock: 35,
			price: 1000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1562986406-60c6ec23a800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Parfum 4',
			description,
			stock: 40,
			price: 8000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=648&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Coklat',
			description,
			stock: 5,
			price: 15000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1530841186512-95c4e728f99e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Knapsack',
			description,
			stock: 25,
			price: 3000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1474376962954-d8a681cc53b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Kamera',
			description,
			stock: 35,
			price: 7000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1543810469-b3b50a31f2b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Jam Tangan 10',
			description,
			stock: 40,
			price: 25000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Portable Speaker',
			description,
			stock: 60,
			price: 7000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1561930661-20c9650e3e25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Sepatu',
			description,
			stock: 15,
			price: 8000000,
			isActive: true,
			imageUrl: 'https://images.unsplash.com/photo-1577983072945-4a01dcd3439a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=652&q=80',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Products', null, {});
	}
}
