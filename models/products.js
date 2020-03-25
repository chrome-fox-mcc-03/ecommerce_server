'use strict';
module.exports = (sequelize, DataTypes) => {


  class Product extends sequelize.Sequelize.Model {}
    Product.init({
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        isUnique: {
          args: true,
          msg: "Item Already Existed"
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Name Must Be Filled!!"
          },
          notNull: {
            args: true,
            msg: "Please Fill The Item Name"
          }

        }
      } ,
      Image_Url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Image_Url must be filled!"
          },
          notNull: {
            args: true,
            msg: "Please Fill The Image Url"
          }
        }
      } ,
      Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price Must Be Filled!!"
          },
          min: {
            args: '0',
            msg:"Price Must At least 0"
          },
          notNull: {
            args: true,
            msg: "Please Fill The Price"
          }
        }
      },
      Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Stock Must be Filled"
          },
          min: {
            args: '0',
            msg:"Stock Must At least 0"
          },
          notNull: {
            args: true,
            msg: "Please Fill The Stock"
          }
        }
      } 
    }, { sequelize, modelName: 'Product' });

  Product.associate = function(models) {
    Product.hasMany(models.Order),
    Product.hasMany(models.Cart)
    // associations can be defined here
  };
  return Product;
};