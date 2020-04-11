'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {
    static associate (models) {
      Cart.belongsTo(models.Production)
      Cart.belongsTo(models.User)
    }
  }
  Cart.init({
    UserId : {
      type: DataTypes.INTEGER
    },
    ProductionId : {
      type : DataTypes.INTEGER
    },
    Status : {
      type : DataTypes.BOOLEAN
    },
    Stock : {
      type : DataTypes.INTEGER
    }
  },{sequelize})
  return Cart;
};