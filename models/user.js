'use strict';
const { getHash } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {};
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "email is required",
        },
        notEmpty: {
          args: true,
          msg: "email is required",
        },
        isEmail: {
          args: true,
          msg: "wrong email format",
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "password is required",
        },
        notEmpty: {
          args: true,
          msg: "password is required",
        },
        len: {
          args: [6],
          msg: "minimum password length is 6 characters",
        }
      }
    }
  }, {
    sequelize,
    modelName: "User",
  });
  User.addHook('beforeCreate', (user, options) => {
    user.password = getHash(user.password);
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};