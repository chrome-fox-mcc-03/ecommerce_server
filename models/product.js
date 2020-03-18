'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model {}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'NAME REQUIRED'
        },
        notNull: {
          args: true,
          msg: 'NAME REQUIRED'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'CATEGORY REQUIRED'
        },
        notNull: {
          args: true,
          msg: 'CATEGORY REQUIRED'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: {
          args: true,
          msg: "PRICE MUST BE NUMERIC"
        },
        min: {
          args: [0],
          msg: 'PRICE MUST BE NON-NEGATIVE'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "STOCK MUST BE NUMERIC"
        },
        min: {
          args: [0],
          msg: 'STOCK MUST BE NON-NEGATIVE'
        }
      }
    }
  }, {
    sequelize,
    modelName: "Product"
  });
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};