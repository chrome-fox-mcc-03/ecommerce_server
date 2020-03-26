'use strict';
module.exports = (sequelize, DataTypes) => {
  class CartItem extends sequelize.Sequelize.Model{}
  CartItem.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'quantity cannot be null'
        },
        isNumeric: {
          args: true,
          msg: 'quantity should be number'
        },
        min: {
          args: [1],
          msg: 'quantity should at least 1'
        }
      }
    },
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Cart Id cannot be null'
        },
        isNumeric: {
          args: true,
          msg: 'Cart Id should be number'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Product Id cannot be null'
        },
        isNumeric: {
          args: true,
          msg: 'Product Id should be number'
        }
      }
    },
    isPaid: DataTypes.BOOLEAN
  },{
    hooks: {
      beforeCreate : (cartItem) => {
        cartItem.isPaid = false
      }
    },
    sequelize
  })
  CartItem.associate = function(models) {
    // associations can be defined here
    CartItem.belongsTo(models.Cart)
    CartItem.belongsTo(models.Product)
    
  };
  return CartItem;
};