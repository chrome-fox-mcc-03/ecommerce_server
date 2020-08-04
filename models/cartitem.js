'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class CartItem extends Model { }
  CartItem.init({
    quantity: DataTypes.INTEGER,
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'product id cannot be empty'
        }
      }
    },
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'category id cannot be empty'
        }
      }
    }
  }, { sequelize })

  CartItem.associate = function (models) {
    // associations can be defined here
    CartItem.belongsTo(models.Product)
    CartItem.belongsTo(models.Cart)
  };
  return CartItem;
};