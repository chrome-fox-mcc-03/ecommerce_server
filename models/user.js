'use strict';
const { encode } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.Sequelize.Model;

	class User extends model {}

	User.init({
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: 'Email is required'
				},
				notEmpty: {
					args: true,
					msg: 'Email is required'
				},
				isEmail: {
					args: true,
					msg: 'Email format is invalid'
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: 'Password is required'
				},
				notEmpty: {
					args: true,
					msg: 'Password is required'
				}
			}
		},
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
		role: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: 'Role is required'
				},
				notEmpty: {
					args: true,
					msg: 'Role is required'
				},
				isIn: {
					args: [['admin', 'customer']],
					msg: 'Invalid role'
				}
			}
		}
	}, {
		sequelize,
		hooks: {
			beforeCreate (user, opt) {
				user.password = encode(user.password);
			}
		}
	});
	
	User.associate = function(models) {
		User.hasMany(models.Product)
	};

	return User;
};