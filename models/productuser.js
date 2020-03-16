'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductUser = sequelize.define('ProductUser', {
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  ProductUser.associate = function(models) {
    // associations can be defined here
  };
  return ProductUser;
};