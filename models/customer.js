'use strict';
const { getHash } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Customer extends sequelize.Sequelize.Model {}
  Customer.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'email is required'
        },
        notEmpty: {
          args: true,
          msg: 'email is required'
        },
        isEmail: {
          args: true,
          msg: 'invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'password is required'
        },
        notEmpty: {
          args: true,
          msg: 'password is required'
        },
        len: {
          args: [6],
          msg: 'required minimum password length is 6 characters'
        }
      }
    },
    name: DataTypes.STRING,
    avaurl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: 'invalid url format'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
    hooks: {
      afterValidate: (customer, options) => {
        customer.password = getHash(customer.password)
        if (!customer.avaurl) {
          customer.avaurl = `https://api.adorable.io/avatars/125/${customer.email}.png`
        }
        if (!customer.name) {
          customer.name = customer.email.split('@')[0]
        }
      }
    }
  })
  Customer.associate = function(models) {
    // associations can be defined here
  };
  return Customer;
};