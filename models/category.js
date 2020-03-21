'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Category extends Model { }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category name cannot be empty'
        }
      }
    }
  }, { sequelize })

  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Product)
  };
  return Category;
};