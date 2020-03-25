'use strict';
module.exports = (sequelize, DataTypes) => {
  class CartItem extends sequelize.Sequelize.Model{}
  CartItem.init({
    quantity: DataTypes.INTEGER,
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    isPaid: DataTypes.BOOLEAN
  },{
    sequelize
  })
  CartItem.associate = function(models) {
    // associations can be defined here
    CartItem.belongsTo(models.Cart)
    CartItem.belongsTo(models.Product)
    
  };
  return CartItem;
};