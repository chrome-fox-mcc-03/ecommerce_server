'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Cart extends Model {
    static associate (models) {
      Cart.belongsTo(models.User)
      Cart.hasMany(models.CartItem)
      Cart.belongsToMany(models.Item, { through: models.CartItem })
    }
  }
  Cart.init({
    UserId: DataTypes.INTEGER
  }, {sequelize});

  return Cart;
};