'use strict';
module.exports = (sequelize, DataTypes) => {

  class Product extends sequelize.Sequelize.Model {
    static associate(models) {
      Product.hasMany(models.Cart)
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name cannot be empty`
        },
        notNull: {
          args: true,
          msg: `Name cannot be null`
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: '0',
          msg: `Price cannot be negative number`
        },
        notNull: {
          args: true, msg: `Price cannot be null`
        }
      }
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: '0',
          msg: `Stock Quantity cannot be negative number`
        },
        notNull: {
          args: true, msg: `Stock Quantity cannot be null`
        }
      }
    },
    img_url: {
      type: DataTypes.STRING,
      defaultValue: 'https://acacia-wood.com/themes/jtherczeg-multi//assets/images/acacia/empty-img.png',
      validate: {
        isUrl: {
          args: true,
          msg: `Invalid Image Url`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product'
  });

  return Product;
};