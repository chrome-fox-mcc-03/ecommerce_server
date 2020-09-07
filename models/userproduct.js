'use strict';
module.exports = (sequelize, DataTypes) => {
  class UserProduct extends sequelize.Sequelize.Model {}

  UserProduct.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize
  });
  UserProduct.associate = function(models) {
    // associations can be defined here
  };
  return UserProduct;
};