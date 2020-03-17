'use strict';
const { hashPassword } = require('../helpers/bcrypt');


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    role: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: `someone has signed up using this email`
      },
      validate: {
        isEmail: {
          args: true,
          msg: `invalid email format`
        },
        notNull: {
          args: true,
          msg: `email is required`
        },
        notEmpty: {
          args: true,
          msg: `email is required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5],
          msg: `password should be at least 5 characters`
        },
        notNull: {
          args: true,
          msg: `password is required`
        },
        notEmpty: {
          args: true,
          msg: `password is required`
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(User, options) {
        User.password = hashPassword(User.password)
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Product);
  };
  return User;
};