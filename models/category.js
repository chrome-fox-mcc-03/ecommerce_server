'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Item)
    }
  }

  Category.init({
    name: DataTypes.STRING
  }, {sequelize});
  
  return Category;
};