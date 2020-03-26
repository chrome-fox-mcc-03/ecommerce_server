'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User)
      Cart.belongsToMany(models.Product, {through: models.CartProduct})
    }
  }

  Cart.init({
    UserId: DataTypes.INTEGER
  },{
    sequelize
  })

  return Cart;
};