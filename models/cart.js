'use strict';
module.exports = (sequelize, DataTypes) => {
	class Cart extends sequelize.Sequelize.Model {}

	Cart.init({
		UserId: DataTypes.INTEGER,
		ProductId: DataTypes.INTEGER,
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: 'Quantity is required'
				},
				notEmpty: {
					args: true,
					msg: 'Quantity is required'
				},
				min: {
					args: 1,
					msg: 'Minimum quantity is 1'
				}
			}
		},
		isPaid: DataTypes.BOOLEAN
	}, {
		sequelize,
		hooks: {
			beforeCreate (cart, opt) {
				cart.isPaid = false
			}
		}
	})

	Cart.associate = function(models) {
		// associations can be defined here
		Cart.belongsTo(models.User)
		Cart.belongsTo(models.Product)
	};
	return Cart;
};