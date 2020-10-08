'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model {}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name cannot empty'
        },
        notEmpty: {
          args: true,
          msg: 'name cannot be empty'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Price cannot negative value'
        },
        notNull: {
          args: true,
          msg: 'Price cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'Stock at least 1'
        },
        notNull: {
          args: true,
          msg: 'Stock cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Stock cannot be empty'
        }
      }
    }
  }, {
    sequelize
  })
  Product.associate = function(models) {
    // Product.belongsToMany(models.Cart, { through: models.CartProduct })
    Product.hasMany(models.CartProduct)
  };
  return Product;
};