'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Product = sequelize.define('Product', {
  //   name: DataTypes.STRING,
  //   img_url: DataTypes.STRING,
  //   price: DataTypes.STRING,
  //   stock: DataTypes.INTEGER,
  //   category: DataTypes.STRING
  // }, {});

  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please fill this name of product"
        },
        notEmpty: {
          args: true,
          msg: "Please fill this name of product"
        },
      }
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          args: true,
          msg: "Please use URL link"
        },
        notNull: {
          args: true,
          msg: "Please fill this URL link for picture"
        },
        notEmpty: {
          args: true,
          msg: "Please fill this URL link for picture"
        },
        notContains: {
          args: ' ',
          msg: 'Please use URL format'
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please fill the Product's price"
        },
        notEmpty: {
          args: true,
          msg: "Please fill the Product's price"
        },
      }
    },
    stock: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {sequelize, modelName: "Product"})
  Product.associate = function(models) {
    // associations can be defined here
    // Product.belongsTo(models.Cart)
  };
  return Product;
};