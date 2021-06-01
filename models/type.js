'use strict';
module.exports = (sequelize, DataTypes) => {
  class Type extends sequelize.Sequelize.Model {
    static associate(models) {
      Type.hasMany(models.Product)
    }
  }
  Type.init({
    type: DataTypes.STRING
  }, { sequelize })
  return Type;
};