'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {}

  Cart.init({
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'product cannot be empty'
        },
        customValidator(value) {
          if (value < 0) {
            throw new Error('quantity cannot be negative')
          }
        }
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'total price cannot be empty'
        },
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'status cannot be empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'UserId cannot be empty '
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'ProductId cannot be empty'
        }
      }
    }
  }, {
    sequelize
  })
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Product)
    Cart.belongsTo(models.User)
  };
  return Cart;
};