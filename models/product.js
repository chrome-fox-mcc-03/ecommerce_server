'use strict';
module.exports = (sequelize, DataTypes) => {
	const model = sequelize.Sequelize.Model;

	class Product extends model {}

	Product.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: 'Name is required'
				},
				notEmpty: {
					args: true,
					msg: 'Name is required'
				}
			}
		},
		description: DataTypes.STRING,
		stock: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: 'Stock must be at least 0'
				},
				notEmpty: {
					args: true,
					msg: 'Stock must be at least 0'
				},
				isGreaterThanZero (value) {
					if (value < 0) {
						throw 'Stock must be at least 0'
					}
				}
			}
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: 'Price must be at least 0'
				},
				notEmpty: {
					args: true,
					msg: 'Price must be at least 0'
				},
				isGreaterThanZero (value) {
					if (value < 0) {
						throw 'Price must be at least 0'
					}
				}
			}
		},
		imageUrl: {
			type: DataTypes.STRING
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: 'isActive is required'
				},
				isIn: {
					args: [[true, false]],
					msg: 'isActive is invalid'
				}
			}
		}
	}, {
		sequelize,
		hooks: {
			beforeCreate (product, opt) {
				if (!product.imageUrl || product.imageUrl === '') {
					product.imageUrl = 'https://www.digopaul.com/wp-content/uploads/related_images/2015/09/08/placeholder_2.jpg'
				}
			}
		}
	});

	Product.associate = function(models) {
		Product.hasMany(models.Cart)
	};

	return Product;
};