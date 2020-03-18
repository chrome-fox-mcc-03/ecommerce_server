'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'name cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'name cannot be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'image url cannot be null'
        },
        isUrl: {
          args: true,
          msg: 'invalid url'
        },
        notEmpty: {
          args: true,
          msg: 'imageurl cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'price cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'price cannot be empty'
        },
        customValidator(value) {
          if (value < 0) {
            throw new Error('price cannot be negative')
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'stock cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'stock cannot be empty'
        },
        customValidator(value) {
          if (value < 0) {
            throw new Error('stock cannot be negative')
          }
        }
      }
    }
  }, {
    sequelize 
  })
  
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};