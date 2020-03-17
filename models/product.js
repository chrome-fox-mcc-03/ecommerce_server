'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {
    static associate(models) {
      Product.belongsTo(models.Type)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'product name cannot be empty'
      },
      validate: {
        len: {
          args: [1],
          msg: 'product name cannot be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'image url cannot be empty'
      },
      validate: {
        len: {
          args: [1],
          msg: 'image url cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'price cannot be empty'
      },
      validate: {
        min: {
          args: [0],
          msg: 'price cannot less than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'stock cannot be empty'
      },
      validate: {
        min: {
          args: [0],
          msg: 'stock cannot less than 0'
        }
      }
    },
    TypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'type cannot be empty'
        }
      }
    }
  }, {
    sequelize
  })
  return Product;
};