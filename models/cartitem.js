'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class CartItem extends Model {
    static associate (models) {
      CartItem.belongsTo(models.Cart)
      CartItem.belongsTo(models.Item)
    }
  }
  CartItem.init({
    quantity: DataTypes.INTEGER,
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    CartId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER
  }, {sequelize});

  return CartItem;
};