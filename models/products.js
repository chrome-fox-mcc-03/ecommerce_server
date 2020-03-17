'use strict';
module.exports = (sequelize, DataTypes) => {


  class Product extends sequelize.Sequelize.Model {}
    Product.init({
      Name: {
        type: DataTypes.STRING,
        isUnique: {
          args: true,
          msg: "Item Already Existed"
        }
      } ,
      Image_Url: DataTypes.STRING,
      Price: DataTypes.INTEGER,
      Stock: DataTypes.INTEGER
    }, { sequelize, modelName: 'Product' });

  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};