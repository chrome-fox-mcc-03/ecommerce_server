'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `name is required`
        },
        notEmpty: {
          args: true,
          msg: `name is required`
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: `price must be higher than 0`
        },
        notNull: {
          args: true,
          msg: `price is required`
        },
        notEmpty: {
          args: true,
          msg: `price is required`
        }
      }
    }, 
    stock: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Product.associate = function (models) {
    Product.belongsTo(models.User)
  };
  return Product;
};