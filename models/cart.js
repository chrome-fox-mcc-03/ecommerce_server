'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {
    static associate (models) {
      
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