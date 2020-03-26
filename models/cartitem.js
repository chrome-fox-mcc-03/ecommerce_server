'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class CartItem extends Model { }
  CartItem.init({
    quantity: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    CartId: DataTypes.INTEGER
  }, { sequelize })

  CartItem.associate = function (models) {
    // associations can be defined here
    CartItem.belongsTo(models.Product)
    CartItem.belongsTo(models.Cart)
  };
  return CartItem;
};