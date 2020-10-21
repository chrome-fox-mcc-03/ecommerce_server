'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      min: 0
    },
    totalPrice: DataTypes.INTEGER,
    isPaid: DataTypes.BOOLEAN
  }, {});
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};