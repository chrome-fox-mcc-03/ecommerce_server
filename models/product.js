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
          msg: 'Name is required'
        },
        notNull: {
          args: true,
          msg: 'Name is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image is required'
        },
        notNull: {
          args: true,
          msg: 'Image is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: '0',
          msg: 'Price cannot be less than 0'
        },
        notEmpty: {
          args: true,
          msg: 'Price is required'
        },
        notNull: {
          args: true,
          msg: 'Price is required'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: `0`,
          msg: 'Stock cannot be less than 0'
        },
        notEmpty: {
          args: true,
          msg: 'Stock is required'
        },
        notNull: {
          args: true,
          msg: 'Stock is required'
        }
      }
    },
    AdminId: {
      type: DataTypes.INTEGER
    },
    genre: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Product'
  })
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User, { foreignKey: 'AdminId' })
  };
  return Product;
};