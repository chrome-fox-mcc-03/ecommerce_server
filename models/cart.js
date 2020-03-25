'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model{}
  Cart.init({
    UserId: DataTypes.INTEGER
  },{
    sequelize
  })
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.hasMany(models.CartItem)
    Cart.belongsTo(models.User)
  };
  return Cart;
};