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
          msg:'email is required'
        },
        notEmpty: {
          args: true,
          msg: 'email is required'
        }
      }
    },
    image_url: {
      type:DataTypes.STRING
    },
    price: {
      type:DataTypes.INTEGER
    },
    stock: {
      type:DataTypes.INTEGER
    }
  }, {
    sequelize
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};