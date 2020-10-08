'use strict';
module.exports = (sequelize, DataTypes) => {
  class CartProducts extends sequelize.Sequelize.Model {}
  CartProducts.init({
    CartId: {
      type: DataTypes.INTEGER
    },
    ProductId: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'quantity is required'
        },
        notEmpty: {
          args: true,
          msg: 'quantity is required'
        },
        isInt: {
          args: true,
          msg: 'quantity must be integer'
        },
        min: {
          args: '0',
          msg: 'quantity cannot be negative number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CartProducts'
  })
  CartProducts.associate = function(models) {
    // associations can be defined here
    CartProducts.belongsTo(models.Cart)
    CartProducts.belongsTo(models.Product)
  };
  return CartProducts;
};