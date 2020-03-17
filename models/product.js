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
		UserId: DataTypes.INTEGER
	}, {
		sequelize
	});

	Product.associate = function(models) {
		Product.belongsTo(models.User)
	};

	return Product;
};