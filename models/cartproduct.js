'use strict';
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends sequelize.Sequelize.Model {}
  CartProduct.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please insert quantity'
        },
        notEmpty: {
          msg: 'Please insert quantity'
        },
        min: {
          args: [1],
          msg: 'Quantity is not valid'
        }
      }
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please insert cart_id'
        },
        notEmpty: {
          msg: 'Please insert cart_id'
        }
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please choose the product'
        },
        notEmpty: {
          msg: 'Please choose the product'
        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CartProduct'
  });
  CartProduct.associate = function(models) {
    // associations can be defined here
  };
  return CartProduct;
};