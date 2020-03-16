'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model {
    static associate(models) {}
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Product Name Is Required'
        },
        notNull: {
          args: true,
          msg: 'Product Name Is Required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image Url Is Required'
        },
        notNull: {
          args: true,
          msg: 'Image Url Is Required'
        },
        isUrl: {
          args: true,
          msg: 'Image Url Is Required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 100,
          msg: 'price cannot be less than 100'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER
    },
    sequelize,
    modelName: 'Product'
  })
  return Product;
};