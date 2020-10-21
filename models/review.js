'use strict';
module.exports = (sequelize, DataTypes) => {
  class Review extends sequelize.Sequelize.Model {}
  Review.init({
    review: DataTypes.STRING,
    point: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  },{
    sequelize,
    modelName: 'Review'
  })
  Review.associate = function(models) {
    Review.belongsTo(models.User)
    Review.belongsTo(models.Product)
  };
  return Review;
};