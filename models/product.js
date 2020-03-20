'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'name must be filled'
        },
        notNull : {
          args: true,
          msg: 'name must be filled'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          args: true,
          msg: 'image url must be in url format'
        },
        notEmpty: {
          args: true,
          msg: 'image url must be filled'
        },
        notNull: {
          args: true,
          msg: 'image url must be filled'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'price must be filled'
        },
        isNumeric: {
          args: true,
          msg: 'price must be number'
        },
        min: {
          args: [0],
          msg: 'minimum price value is zero'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'stock must be filled'
        },
        isInt: {
          args: true,
          msg: 'stock must be number'
        },
        min: {
          args: [0],
          msg: 'minimum stock value is zero'
        }
      }
    }
  }, {
    sequelize,
    modelName: "Product"
  })
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};