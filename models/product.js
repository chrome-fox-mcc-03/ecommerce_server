'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model {
    static associate (models) {
      Product.belongsTo(models.Category)
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please input product's name"
        },
        notEmpty: {
          args: true,
          msg: "Please input product's name"
        }
      }
    }, 
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please input product's image url"
        },
        notEmpty: {
          args: true,
          msg: "Please input product's image url"
        },
        isUrl: {
          args: true,
          msg: "Invalid format url"
        }
      }
    }, 
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please input product's price"
        },
        notEmpty: {
          args: true,
          msg: "Please input product's price"
        },
        minimalPrice (value, next) {
          if (value >= 0) {
            next()
          } else {
            next('The lowest price is 0')
          }
        } 
      }
    }, 
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please input product's stock"
        },
        notEmpty: {
          args: true,
          msg: "Please input product's stock"
        },
        minimalStock (value, next) {
          if (value >= 0) {
            next()
          } else {
            next('The lowest amount of stock is 0')
          }
        }
      }
    },
    description: DataTypes.STRING,
    CategoryId : DataTypes.INTEGER
  },{
    sequelize
  })
  
  return Product;
};