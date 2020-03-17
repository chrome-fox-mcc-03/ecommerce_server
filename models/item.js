'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Category)
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Item name cannot empty'
        },
        notEmpty: {
          msg: 'Item name cannot empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Item price cannot null' }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Item stock cannot null' }
      }
    },
    imageUrl: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {sequelize});

  return Item;
};