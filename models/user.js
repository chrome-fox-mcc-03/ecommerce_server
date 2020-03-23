'use strict';

const { hashPassword } = require('../helpers')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      User.hasMany(models.Cart)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'username cannot be empty'
      },
      validate: {
        len: {
          args: [1],
          msg: 'username cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'email cannot be empty'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'email must contain email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'password cannot be empty'
      },
      validate: {
        len: {
          args: [5],
          msg: 'password length cannot less than 5 character'
        }
      }
    },
    role: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  })
  return User;
};