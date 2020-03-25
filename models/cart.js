'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model {}
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    total_qty: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'checkout'],
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Cart'
  });
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Product)
    Cart.belongsTo(models.User)
  };
  return Cart;
};