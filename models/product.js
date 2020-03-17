'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model 

  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input product's name"
        },
        notEmpty: {
          args: true,
          msg: "Please input product's name"
        },
      },
      unique: {
        args: true,
        msg: "Product has been registered, please input another product"
      }
    },
    image_url: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input product's price"
        },
        isNumeric: {
          args: true,
          msg: "Please input product's price"
        },
        min: {
          args: 1,
          msg: "Please input product's price"
        }
      }
    },
    stock: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input product's quantity"
        },
        isNumeric: {
          args: true,
          msg: "Please input product's quantity"
        },
        min: {
          args: 0,
          msg: "Please input product's quantity"
        }
      }
    },
    UserId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  })
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};