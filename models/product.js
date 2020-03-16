'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          args: true,
          msg:'name is required'
        },
        notEmpty: {
          args: true,
          msg: 'name is required'
        }
      }
    },
    image_url: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args:true,
          msg:'image is required'
        },
        notNull: {
          args:true,
          msg:'image is required'
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        isNegative: (value,next) => {
          if(value < 1) {
            next({status:500,message:'price cant 0 or negative'})
          }else next()
        },
        notEmpty: {
          args:true,
          msg:'price is required'
        },
        notNull: {
          args:true,
          msg:'price is required'
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        isNegative: (value,next) => {
          if(value < 1) {
            next({status:500,message:'stock cant 0 or negative'})
          }else next()
        },
        notEmpty: {
          args:true,
          msg:'stock is required'
        },
        notNull: {
          args:true,
          msg:'stock is required'
        }
      }
    }
  }, {
    sequelize
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};