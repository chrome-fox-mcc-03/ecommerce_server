'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {}

  Cart.init({
    product_qty: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart'
  })
  
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};