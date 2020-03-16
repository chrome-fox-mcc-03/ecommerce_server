'use strict';
module.exports = (sequelize, DataTypes) => {
  
  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : {
        args : false,
        msg : 'please insert product name'
      },
    },
    image_url: {
      type : DataTypes.STRING
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        isNegative : (product) => {
          if(product.price < 0){
            throw new Error('price cannot be negative')
          }
        },
        isInt : {
          args : true,
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        isNegative : (product) => {
          if(product.price < 0){
            throw new Error('stock cannot be negative')
          }
        },
        isInt : {
          args : true,
        }
      }
    },
  },{
    sequelize
  })

  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};