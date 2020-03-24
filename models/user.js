'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input with valid email!"
        },
        isEmail: {
          args: true,
          msg: "Please input with valid email!"
        }
      },
      unique: {
        args: true,
        msg: "Email has been registered, please choose another email"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5],
          msg: "Password at least 5 characters"
        },
        notNull: {
          args: true,
          msg: "Password at least 5 characters"
        }
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input your name!"
        },
        notEmpty: {
          args: true,
          msg: "Please input your name!"
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize,
    hooks: {
      beforeCreate(user, options) {
        user.password = hashPassword(user.password)
      }
    }
  })

  User.associate = function (models) {
    User.hasOne(models.Cart)
  };
  return User;
};