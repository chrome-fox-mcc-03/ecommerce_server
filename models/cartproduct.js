'use strict';
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends sequelize.Sequelize.Model{}
  CartProduct.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'quantity must be filled'
        },
        isInt: {
          args: true,
          msg: 'quantity must be in integer format'
        }
      }
    },
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'CartId must be filled'
        },
        isInt: {
          args: true,
          msg: 'CartId must be in integer format'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'ProductId must be filled'
        },
        isInt: {
          args: true,
          msg: 'ProductId must be in integer format'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CartProduct'
  })
  CartProduct.associate = function(models) {
    // associations can be defined here
    CartProduct.belongsTo(models.Cart)
    CartProduct.belongsTo(models.Product)
  };
  return CartProduct;
};