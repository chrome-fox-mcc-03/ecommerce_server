'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model { }
  Cart.init({
    UserId: DataTypes.INTEGER
  }, { sequelize })

  Cart.associate = function (models) {
    // associations can be defined here
  };
  return Cart;
};