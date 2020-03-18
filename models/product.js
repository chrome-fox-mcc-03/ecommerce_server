'use strict';
module.exports = (sequelize, DataTypes) => {

  class Product extends sequelize.Sequelize.Model { }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter name'
        },
        notEmpty: {
          msg: 'Please enter name'
        }
      }
    },
    img_url: DataTypes.STRING,
    description: DataTypes.STRING,
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter price'
        },
        notEmpty: {
          msg: 'Please enter price'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter stock'
        },
        notEmpty: {
          msg: 'Please enter stock'
        }
      }
    }
  }, {
    sequelize
  });

  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};