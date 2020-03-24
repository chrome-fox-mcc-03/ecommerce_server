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
    image_url: {
      type: DataTypes.STRING,
      defaultValue: `https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png`
    },
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
  }, { sequelize,
    hooks: {
      beforeCreate(User, options) {
        if (Product.image_url == '') {
          Product.image_url = `https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png`
        }
      }
    } });
  Product.associate = function (models) {
    Product.belongsTo(models.User);
    Product.hasMany(models.Cart);
  };
  return Product;
};