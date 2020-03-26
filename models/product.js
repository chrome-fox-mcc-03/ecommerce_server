"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Cart);
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Name must be filled"
          },
          notEmpty: {
            args: true,
            msg: "Name cannot be empty"
          }
        }
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          "https://dqzrr9k4bjpzk.cloudfront.net/images/19763157/1208531574.jpg"
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Price must be filled"
          },
          isDecimal: {
            args: true,
            msg: "Price must be a number"
          },
          min: {
            args: 1,
            msg: "Price must be bigger than zero"
          }
        }
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Stock must be filled"
          },
          isInt: {
            args: true,
            msg: "Stock must be a valid integer"
          },
          min: {
            args: 1,
            msg: "Stock must be bigger than zero"
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate: (product, options) => {
          if (product.image_url === "" || product.image_url === null) {
            product.image_url =
              "https://dqzrr9k4bjpzk.cloudfront.net/images/19763157/1208531574.jpg";
          }
        }
      },
      sequelize,
      modelName: "Product"
    }
  );

  return Product;
};
