'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model{}

  Cart.init({
    quantity: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    purchase: DataTypes.BOOLEAN
  }, {
    sequelize,
    hooks: {
      beforeCreate (cart) {
        cart.purchase = false
      }
    }, 
    modelName: 'Cart'
  })
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};