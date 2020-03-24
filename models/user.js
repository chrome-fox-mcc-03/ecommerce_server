'use strict';
const {
  hashPassword
} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Cart)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email Is Required'
        },
        isEmail: {
          args: true,
          msg: 'Invalid Email Format'
        },
        notNull: {
          args: true,
          msg: 'Email Is Required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password Is Required'
        },
        notNull: {
          args: true,
          msg: 'Password Is Required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'role Is Required'
        }
      }
    },
    name:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'name Is Required'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (User, options) => {
        User.password = hashPassword(User.password)
        if (User.role !== 'Super Admin' && User.role !== 'Admin') {
          User.role = 'Customer'
        }
      }
    },
    sequelize,
    modelName: 'User'
  })
  return User;
};