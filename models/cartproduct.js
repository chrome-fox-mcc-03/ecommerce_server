'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class CartProduct extends Model {}

  CartProduct.init({
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "Please input product's quantity"
        }
      }
    },
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize
  })
  CartProduct.associate = function(models) {
    CartProduct.belongsTo(models.Cart)
    CartProduct.belongsTo(models.Product)
  };
  return CartProduct;
};