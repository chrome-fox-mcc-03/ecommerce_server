'use strict';
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends sequelize.Sequelize.Model {}
  CartProduct.init({
    quantity: DataTypes.INTEGER,
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize
  })
  CartProduct.associate = function(models) {
    CartProduct.belongsTo(models.Cart)
    CartProduct.belongsTo(models.Product)
  };
  return CartProduct;
};