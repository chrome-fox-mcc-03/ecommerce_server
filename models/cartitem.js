'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class CartItem extends Model {
    static associate (models) {
      CartItem.belongsTo(models.Cart)
      CartItem.belongsTo(models.Product)
    }
  }
  CartItem.init({
      CartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
              args: true,
              msg: 'CartId Is Required'
            },
            notNull: {
              args: true,
              msg: 'CartId Is Required'
            }
        }
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'CartId Is Required'
          },
          notNull: {
            args: true,
            msg: 'CartId Name Is Required'
          }
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              args: true,
              msg: 'CartId Is Required'
            },
            notNull: {
              args: true,
              msg: 'CartId Name Is Required'
            }
          }
      },
      isPaid: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: (CartItem, options) => {
        if (CartItem.isPaid !== true) {
          CartItem.isPaid = false
        }
      }
    },
    sequelize,
    modelName: 'CartItem'
  })
  return CartItem;
};