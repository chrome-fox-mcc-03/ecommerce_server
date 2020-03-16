'use strict';
module.exports = (sequelize, DataTypes) => {

  class Product extends sequelize.Sequelize.Model {
    static associate(models) {
      Product.hasMany(models.Cart)
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT
    },
    stock_quantity: {
      type: DataTypes.INTEGER
    },
    img_url: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Product'
  });

  return Product;
};