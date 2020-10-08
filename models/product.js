'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {};
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "product name is required",
        },
        notEmpty: {
          args: true,
          msg: "product name is required",
        },
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: "invalid image url",
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "product price is required",
        },
        notEmpty: {
          args: true,
          msg: "product price is required",
        },
        isInt: {
          args: true,
          msg: "invalid price format",
        },
        min: {
          args: '0',
          msg: "price must be positive value or zero",
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "product stock is required",
        },
        notEmpty: {
          args: true,
          msg: "product stock is required",
        },
        isInt: {
          args: true,
          msg: "stock amount must be integer",
        },
        min: {
          args: '0',
          msg: "invalid stock amount",
        },
      }
    },
  }, {
    sequelize,
    modelName: "Product"
  });
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.CartProducts);
  };
  return Product;
};