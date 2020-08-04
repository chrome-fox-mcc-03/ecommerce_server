'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model{}

  Cart.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: '1',
          msg: 'Quantity cannot be less than 1'
        },
        notEmpty: {
          args: true,
          msg: 'Quantity is required'
        },
        notNull: {
          args: true,
          msg: 'Quantity is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'UserId is required'
        },
        notNull: {
          args: true,
          msg: 'UserId is required'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'ProductId is required'
        },
        notNull: {
          args: true,
          msg: 'ProductId is required'
        }
      }
    },
    purchase: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Purchase is required'
        },
        notNull: {
          args: true,
          msg: 'Purchase is required'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate (cart) {
        cart.purchase = false
      }
    }, 
    modelName: 'Cart'
  })
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};