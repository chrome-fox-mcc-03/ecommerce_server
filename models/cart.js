'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {}
  Cart.init({
    UserId: DataTypes.INTEGER,
    isPaid: DataTypes.BOOLEAN
  }, {
    sequelize
  })
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    // Cart.belongsToMany(models.Product, { through: models.CartProduct })
    Cart.hasMany(models.CartProduct)
  };
  return Cart;
};