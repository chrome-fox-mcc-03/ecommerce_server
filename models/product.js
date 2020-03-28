'use strict';
module.exports = (sequelize, DataTypes) => {
  
  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull: {
          args: true,
          msg: 'product name cannot be null'
        }
      }
    },
    image_url: {
      type : DataTypes.STRING
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate: {
        notNull: {
          args: true,
          msg: 'price cannot be null'
        },
        isNumeric: {
          args: true,
          msg: 'price should be number'
        },
        min: {
          args: [0],
          msg: 'price cannot be negative'
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate: {
        notNull: {
          args: true,
          msg: 'stock cannot be null'
        },
        isNumeric: {
          args: true,
          msg: 'stock should be number'
        },
        min: {
          args: [0],
          msg: 'stock cannot be negative'
        }
      }
    },
  },{
    sequelize
  })

  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.CartItem)
  };
  return Product;
};