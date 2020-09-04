'use strict';
const { hashPass } = require('./../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Customer extends sequelize.Sequelize.Model {}
  Customer.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'email must be in email format'
        },
        notEmpty: {
          args: true,
          msg: 'email must be filled'
        },
        notNull: {
          args: true,
          msg: 'email must be filled'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password must be filled'
        },
        notNull: {
          args: true,
          msg: 'password must be filled'
        },
        len: {
          args: [5],
          msg: 'password length must be at least five character'
        }
      }
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'money must be in integer format'
        },
        min: {
          args: [0],
          msg: 'minimum value of money is 0'
        }
      }
    }
  }, {
    hooks: {
      afterValidate (user, options) {
        user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'Customer'
  })
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.hasMany(models.Cart)
  };
  return Customer;
};