'use strict';

const { generatePassword } = require('../helpers/generatePassword')

module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      User.hasMany(models.Cart);
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: `Email cannot be null`
        },
        isEmail: {
          args: true,
          msg: `Invalid email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 10],
          msg: `Password is between 6 to 10 characters`
        },
        notNull: {
          args: true,
          msg: `Password cannot be null`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['admin', 'customer']],
          msg: `Only Admin and Customer`
        },
        notNull: {
          args: true,
          msg: `Role cannot be null`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user, option) {
        user.password = generatePassword(user.password)
      }
    },
    sequelize,
    modelName: 'User'
  });

  return User;
};