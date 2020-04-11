'use strict';
module.exports = (sequelize, DataTypes) => {
  const rating = sequelize.define('rating', {
    rate: DataTypes.INTEGER,
    ProductionId: DataTypes.INTEGER,
    hit: DataTypes.INTEGER
  }, {});
  rating.associate = function(models) {
    // associations can be defined here
    rating.belongsTo(models.Production)
  };
  return rating;
};