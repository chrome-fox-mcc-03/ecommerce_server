'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model{}
  Product.init({
    name : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Product's name cannot be empty"
        },
        notEmpty : {
          args : true,
          msg : "Product's name cannot be empty"
        }
      }
    },
    image_url : {
      type : DataTypes.STRING
    },
    price : {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'Price cannot be empty'
        },
        notEmpty : {
          args : true,
          msg : 'Price cannot be empty'
        }
      }
    },
    stock : {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'Stock cannot be empty'
        },
        notEmpty : {
          args : true,
          msg : 'Stock cannot be empty'
        }
      }
    },
    category: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate: {
        notNull : {
          args : true,
          msg : 'Category cannot be empty'
        },
        notEmpty : {
          args : true,
          msg : 'Category cannot be empty'
        },
        isIn: {
          args: [['food and beverages', 'electronic', 'fashion', 'hobby', 'automotive', 'others']],
          msg: 'Category is not valid'
        }
      }
    }

  },{
    validate : {
      isPriceGreaterThanZero(){
        if (this.price < 0){
          throw new Error("Price must be greater than or equal to 0");
        }
      },
      isStockGreaterThanZero(){
        if (this.stock < 0){
          throw new Error("Stock must be greater than or equal to 0");
        }
      }

    },
    sequelize,
    modelName : 'Product'
  })

  Product.associate = function(models) {
    Product.hasMany(models.Cart)
    Product.hasMany(models.Review)
  };
  return Product;
};