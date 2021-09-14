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
          msg: "Please input product's name"
        },
        notEmpty: {
          args: true,
          msg: "Please input product's name"
        },
      },
      unique: {
        args: true,
        msg: "Product has been registered, please input another product"
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input product's description"
        },
        notEmpty: {
          args: true,
          msg: "Please input product's description"
        },
        len: {
          args: [0, 200],
          msg: "Description's max characters is 200"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input product's price"
        },
        isNumeric: {
          args: true,
          msg: "Please input product's price"
        },
        min: {
          args: 1,
          msg: "Please input product's price"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input product's quantity"
        },
        isNumeric: {
          args: true,
          msg: "Please input product's quantity"
        },
        min: {
          args: 1,
          msg: "Please input product's quantity"
        }
      }
    }
  },
  {
    sequelize
  })
  Product.associate = function(models) {
    Product.belongsToMany(models.Cart, { through: models.CartProduct })
  };
  return Product;
};