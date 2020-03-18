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
      validation: {
        notNull: {
          args: true,
          message: "Please fill this name of product"
        },
        notEmpty: {
          args: true,
          message: "Please fill this name of product"
        },
      }
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        isUrl: {
          args: true,
          message: "Please use URL link"
        },
        notNull: {
          args: true,
          message: "Please fill this URL link for picture"
        },
        notEmpty: {
          args: true,
          message: "Please fill this URL link for picture"
        },
        notContains: {
          args: ' ',
          message: 'Please use URL format'
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notNull: {
          args: true,
          message: "Please fill the Product's price"
        },
        notEmpty: {
          args: true,
          message: "Please fill the Product's price"
        },
      }
    },
    stock: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {sequelize, modelName: "Product"})
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Cart)
  };
  return Product;
};