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
          msg: 'Nama produk harus diisi.'
        },
        len:{
          args: 2,
          msg: 'Minimal 2 karakter'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER
    },
    stock: {
      type: DataTypes.INTEGER
    }
  }, {
    hooks: {
      
    },
    sequelize
  });
  Product.associate = function(models) {
    Product.belongsToMany(models.User, { through: models.UserProduct })
    // associations can be defined here
  };
  return Product;
};