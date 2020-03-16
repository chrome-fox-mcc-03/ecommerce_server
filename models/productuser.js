'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductUser = sequelize.define('ProductUser', {
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  ProductUser.associate = function(models) {
    ProductUser.belongsTo(models.User)
    ProductUser.belongsTo(models.Product)
  };
  return ProductUser;
};