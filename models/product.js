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
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://img.okezone.com/content/2020/01/27/481/2159096/cegah-peredaran-obat-ilegal-rempah-dan-jamu-tradisional-bisa-jadi-solusi-gYQvd8AErO.jpg'
    },
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