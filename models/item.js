'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Category)
      Item.hasMany(models.CartItem)
      Item.belongsToMany(models.Cart, { through: models.CartItem })
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Item name cannot empty' },
        notEmpty: { msg: 'Item name cannot empty' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Item price cannot be null' },
        min: {
          args: [0],
          msg: 'Price cannot be negative'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Item stock cannot be null' },
        min: {
          args: [0],
          msg: 'Stock cannot be negative'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: 'https://www.dubaiautodrome.com/wp-content/uploads/2016/08/placeholder.png',
      validate: {
        isUrl: { msg: 'Image path must be URL' }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {sequelize});

  return Item;
};