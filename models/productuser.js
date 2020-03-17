'use strict';
module.exports = (sequelize, DataTypes) => {
	
	const Model = sequelize.Sequelize.Model
	
	class ProductUser extends Model {}

	ProductUser.init({
		ProductId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		UserId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize
	})

	ProductUser.associate = function(models) {
		// associations can be defined here
	};

	return ProductUser;
	};