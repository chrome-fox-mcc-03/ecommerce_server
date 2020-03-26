'use strict';
const hash = require('../helpers/hashPassword');

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email cannot be null'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password cannot be null'
        },
        len: {
          args: [6],
          msg: 'Password has at least 6 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Role cannot be null'
        },
        isIn: {
          args: [['customer', 'admin']],
          msg: 'Role is only for "customer" and "admin"'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        const hashPass = hash.hashPassword(instance.password)
        instance.password = hashPass
      }
    }
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Cart)
  };
  return User;
};