'use strict';
module.exports = (sequelize, DataTypes) => {
  class History extends sequelize.Sequelize.Model {
    static associate(models) {
      History.belongsTo(models.Cart)
    }
  }
  History.init({
    CartId: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, { sequelize })
  return History;
};